// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package main

const (
	ClickHouseStacksFlushTimeout  = 30
	ClickHouseMetricsFlushTimeout = 30
	MaxS3FileSize                 = 25 * 1024 * 1024
	ScannerBufSize                = 1024 * 1024
	MaxScannerBufSize             = 25 * ScannerBufSize
	V1Prefix                      = "v1"
	ConfPrefix                    = "conf/"
	AppName                       = "gprofiler-indexer"
	ISODateTimeFormat             = "2006-01-02T15:04:05"
)
