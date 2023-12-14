// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package main

import (
	"flag"
)

type CLIArgs struct {
	SQSQueue                   string
	S3Bucket                   string
	ClickHouseAddr             string
	ClickHouseUser             string
	ClickHousePassword         string
	ClickHouseUseTLS           bool
	ClickHouseStacksTable      string
	ClickHouseMetricsTable     string
	Concurrency                int
	ClickHouseStacksBatchSize  int
	ClickHouseMetricsBatchSize int
	InputFolder                string
	FrameReplaceFileName       string
	AWSEndpoint                string
	AWSRegion                  string
}

func NewCliArgs() *CLIArgs {
	return &CLIArgs{
		ClickHouseAddr:             "localhost:9000",
		ClickHouseStacksTable:      "flamedb.samples",
		ClickHouseMetricsTable:     "flamedb.metrics",
		ClickHouseUser:             "default",
		ClickHousePassword:         "",
		ClickHouseUseTLS:           false,
		Concurrency:                2,
		ClickHouseStacksBatchSize:  10000,
		ClickHouseMetricsBatchSize: 100,
		FrameReplaceFileName:       ConfPrefix + "replace.yaml",
	}
}

func (ca *CLIArgs) ParseArgs() {
	flag.StringVar(&ca.SQSQueue, "sqs-queue", LookupEnvOrString("SQS_QUEUE_URL", ca.SQSQueue),
		"SQS Queue name to listen")
	flag.StringVar(&ca.S3Bucket, "s3-bucket", LookupEnvOrString("S3_BUCKET", ca.S3Bucket), "S3 bucket name")
	flag.StringVar(&ca.AWSEndpoint, "aws-endpoint", LookupEnvOrString("S3_ENDPOINT", ca.AWSEndpoint), "AWS Endpoint URL")
	flag.StringVar(&ca.AWSRegion, "aws-region", LookupEnvOrString("AWS_REGION", ca.AWSRegion), "AWS Region")
	flag.StringVar(&ca.ClickHouseAddr, "clickhouse-addr", LookupEnvOrString("CLICKHOUSE_ADDR", ca.ClickHouseAddr),
		"ClickHouse address like 127.0.0.1:9000")
	flag.StringVar(&ca.ClickHouseUser, "clickhouse-user", LookupEnvOrString("CLICKHOUSE_USER", ca.ClickHouseUser),
		"ClickHouse user (default default)")
	flag.StringVar(&ca.ClickHousePassword, "clickhouse-password", LookupEnvOrString("CLICKHOUSE_PASSWORD",
		ca.ClickHousePassword), "ClickHouse password (default empty)")
	flag.BoolVar(&ca.ClickHouseUseTLS, "clickhouse-use-tls", LookupEnvOrBool("CLICKHOUSE_USE_TLS",
		ca.ClickHouseUseTLS), "ClickHouse use TLS (default false)")
	flag.StringVar(&ca.ClickHouseStacksTable, "clickhouse-stacks-table", LookupEnvOrString("CLICKHOUSE_STACKS_TABLE",
		ca.ClickHouseStacksTable), "ClickHouse stacks table (default samples)")
	flag.StringVar(&ca.InputFolder, "input-folder", "", "process files in local folder instead of listen SQS ("+
		"only for developers)")
	flag.StringVar(&ca.ClickHouseMetricsTable, "clickhouse-metrics-table", LookupEnvOrString("CLICKHOUSE_METRICS_TABLE",
		ca.ClickHouseMetricsTable), "ClickHouse metrics table (default metrics)")
	flag.IntVar(&ca.Concurrency, "c", LookupEnvOrInt("CONCURRENCY", ca.Concurrency), "Concurrency")
	flag.IntVar(&ca.ClickHouseStacksBatchSize, "clickhouse-stacks-batch-size",
		LookupEnvOrInt("CLICKHOUSE_STACKS_BATCH_SIZE", ca.ClickHouseStacksBatchSize),
		"clickhouse stack batch size (default 10000)")
	flag.IntVar(&ca.ClickHouseMetricsBatchSize, "clickhouse-metrics-batch-size",
		LookupEnvOrInt("CLICKHOUSE_METRICS_BATCH_SIZE", ca.ClickHouseMetricsBatchSize),
		"clickhouse metrics batch size (default 100)")
	flag.StringVar(&ca.FrameReplaceFileName, "replace-file", LookupEnvOrString("REPLACE_FILE",
		ca.FrameReplaceFileName),
		"replace.yaml")
	flag.Parse()

	if ca.SQSQueue == "" && ca.InputFolder == "" {
		logger.Fatal("You must supply the name of a queue (-sqs-queue QUEUE)")
	}

	if ca.S3Bucket == "" && ca.InputFolder == "" {
		logger.Fatal("You must supply the name of a bucket (-s3-bucket BUCKET)")
	}
}