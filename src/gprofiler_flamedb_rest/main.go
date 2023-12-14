// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package main

import (
	"flag"
	"restflamedb/common"
	"restflamedb/config"
	"restflamedb/db"
	"restflamedb/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
)

func main() {
	flag.StringVar(&config.ClickHouseAddr, "clickhouse-addr",
		common.LookupEnvOrDefault("CLICKHOUSE_ADDR", config.ClickHouseAddr),
		"ClickHouse address like 127.0.0.1:9000")
	flag.StringVar(&config.ClickHouseStacksTable, "clickhouse-stacks-table",
		common.LookupEnvOrDefault("CLICKHOUSE_STACKS_TABLE", config.ClickHouseStacksTable),
		"ClickHouse stacks table (default samples)")
	flag.StringVar(&config.ClickHouseMetricsTable, "clickhouse-metrics-table",
		common.LookupEnvOrDefault("CLICKHOUSE_METRICS_TABLE", config.ClickHouseMetricsTable),
		"ClickHouse metrics table (default metrics)")
	flag.Parse()

	h := handlers.Handlers{
		ChClient: db.NewClickHouseClient(config.ClickHouseAddr),
	}

	router := gin.Default()
	cfg := cors.DefaultConfig()
	// Allow all origins
	cfg.AllowAllOrigins = true
	router.Use(cors.New(cfg))
	router.Use(gzip.Gzip(gzip.DefaultCompression))
	router.Use(handlers.StartTime())
	// Register endpoints
	router.GET("/api/v1/flamegraph", h.GetFlamegraph)
	router.GET("/api/v1/query", h.QueryMeta)
	router.GET("/api/v1/sessions_count", h.QuerySessionsCount)
	router.GET("/api/v1/services", h.QueryServices)
	router.GET("/api/v1/metrics/summary", h.GetMetricsSummary)
	router.POST("/api/v1/metrics/services_list_summary", h.GetMetricsServicesListSummary)
	router.GET("/api/v1/metrics/graph", h.GetMetricsGraph)
	router.GET("/api/v1/metrics/cpu_trend", h.GetMetricsCpuTrends)
	router.Run("0.0.0.0:8080")
}
