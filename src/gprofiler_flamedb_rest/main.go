// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package main

import (
	"flag"
	"log"
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
	flag.BoolVar(&config.UseTLS, "use-tls",
		common.LookupEnvOrDefault("USE_TLS", config.UseTLS),
		"Run server with TLS ('false' or '0' to disable), (default true)")
	flag.StringVar(&config.CertFilePath, "cert-file-path",
		common.LookupEnvOrDefault("CERT_FILE_PATH", config.CertFilePath),
		"default empty")
	flag.StringVar(&config.KeyFilePath, "key-file-path",
		common.LookupEnvOrDefault("KEY_FILE_PATH", config.KeyFilePath),
		"default empty")
	flag.StringVar(&config.Credentials, "basic-auth-credentials",
		common.LookupEnvOrDefault("BASIC_AUTH_CREDENTIALS", config.Credentials),
		"Credentials to use in basic auth header")
	flag.Parse()

	h := handlers.Handlers{
		ChClient: db.NewClickHouseClient(config.ClickHouseAddr),
	}

	router := gin.Default()

	authorizedUsers, err := common.ParseCredentials(config.Credentials)
	if err != nil {
		log.Fatalf("Error parsing basic auth credentials: %v", err)
	}
	router.Use(gin.BasicAuth(authorizedUsers))

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
	if config.UseTLS {
		router.RunTLS("0.0.0.0:4433", config.CertFilePath, config.KeyFilePath)
	} else {
		router.Run("0.0.0.0:8080")
	}
}
