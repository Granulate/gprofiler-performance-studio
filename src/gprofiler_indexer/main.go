// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package main

import (
	"context"
	"go.uber.org/zap"
	"os"
	"os/signal"
	"sync"
	"syscall"
)

var (
	frameReplacer *FrameReplacer
	logger        *zap.SugaredLogger
)

type RecordChannels struct {
	StacksRecords  chan StackRecord
	MetricsRecords chan MetricRecord
}

func InitLogs() {
	prodLogger, _ := zap.NewDevelopment()
	logger = prodLogger.Sugar()
}

func main() {
	InitLogs()
	args := NewCliArgs()
	args.ParseArgs()

	logger.Infof("Starting %s", AppName)
	tasks := make(chan SQSMessage, args.Concurrency)
	channels := RecordChannels{
		StacksRecords:  make(chan StackRecord, args.ClickHouseStacksBatchSize),
		MetricsRecords: make(chan MetricRecord, args.ClickHouseMetricsBatchSize),
	}
	ctx, cancelFunc := context.WithCancel(context.Background())
	var tasksWaitGroup sync.WaitGroup
	var listenSQSWaitGroup sync.WaitGroup
	var buffWriterWaitGroup sync.WaitGroup

	frameReplacer = NewFrameReplacer()
	frameReplacer.InitRegexps(args.FrameReplaceFileName)
	callStackWriter := NewProfilesWriter(&channels)

	reloader, watcherErr := NewFileReloader(args)
	reloader.Start(ctx)
	if watcherErr == nil {
		files := []string{args.FrameReplaceFileName}
		for _, filename := range files {
			err := reloader.Add(filename)
			if err != nil {
				logger.Fatalf("unable add reloader to file %s, %v", filename, err)
			}
			reloader.LoadFile(filename)
		}
	} else {
		logger.Warnf("Unable to create reloader %v", watcherErr)
	}
	// spawn workers
	for idx := 0; idx < args.Concurrency; idx++ {
		tasksWaitGroup.Add(1)
		go Worker(idx, args, tasks, callStackWriter, &tasksWaitGroup)
	}

	if args.InputFolder == "" {
		logger.Debugf("start listening SQS queue %s", args.SQSQueue)
		listenSQSWaitGroup.Add(1)
		go ListenSqs(ctx, args, tasks, &listenSQSWaitGroup)
	} else {
		listenSQSWaitGroup.Add(1)
		go ProcessFolder(ctx, tasks, args.InputFolder, &listenSQSWaitGroup)
	}

	buffWriterWaitGroup.Add(1)
	go BufferedClickHouseWrite(args, &channels, &buffWriterWaitGroup)

	signalChannel := make(chan os.Signal, 2)
	signal.Notify(signalChannel, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		for sig := range signalChannel {
			logger.Debugf("signal %s received", sig)
			cancelFunc()
			listenSQSWaitGroup.Wait()
			close(tasks)
			tasksWaitGroup.Wait()
			close(channels.StacksRecords)
			close(channels.MetricsRecords)
		}
	}()

	buffWriterWaitGroup.Wait()
	logger.Info("Graceful shutdown")
}