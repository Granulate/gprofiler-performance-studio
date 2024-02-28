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
