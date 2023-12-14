// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package main

import (
	"context"
	"github.com/fsnotify/fsnotify"
)

type FileReloader struct {
	Watcher              *fsnotify.Watcher
	FrameReplaceFileName string
}

func NewFileReloader(args *CLIArgs) (*FileReloader, error) {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		logger.Fatal(err)
	}
	return &FileReloader{
		Watcher:              watcher,
		FrameReplaceFileName: args.FrameReplaceFileName,
	}, nil
}

func (r *FileReloader) Start(ctx context.Context) {
	go func() {
		var err error
		for {
			select {
			case <-ctx.Done():
				logger.Debug("fileReloader finished")
				return
			case event, ok := <-r.Watcher.Events:
				if !ok {
					return
				}
				logger.Debugf("event: %v", event)
				if event.Has(fsnotify.Remove) {
					err = r.Watcher.Remove(event.Name)
					if err != nil {
						logger.Errorf("unable remove watcher from file %s, %v", event.Name, err)
					}
					err = r.Watcher.Add(event.Name)
					if err != nil {
						logger.Errorf("unable add watcher to file %s, %v", event.Name, err)
					}
					r.LoadFile(event.Name)
				}
				if event.Has(fsnotify.Write) {
					r.LoadFile(event.Name)
				}
			case watchErr, ok := <-r.Watcher.Errors:
				if !ok {
					return
				}
				logger.Debugf("error: %v", watchErr)
			}
		}
	}()
}

func (r *FileReloader) LoadFile(filename string) {
	var err error
	switch {
	case filename == r.FrameReplaceFileName:
		err = frameReplacer.InitRegexps(filename)
		if err != nil {
			logger.Errorf("Error while InitRegexps: %v", err)
		}
	default:
	}
}

func (r *FileReloader) Add(filename string) error {
	return r.Watcher.Add(filename)
}
