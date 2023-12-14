// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package handlers

import (
	"github.com/a8m/rql"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"restflamedb/common"
	"restflamedb/db"
)

type Handlers struct {
	ChClient *db.ClickHouseClient
}

var QueryParser = rql.MustNewParser(rql.Config{
	Model:         common.FiltersParams{},
	FieldSep:      ".",
	LimitMaxValue: 25,
})

var MetricsQueryParser = rql.MustNewParser(rql.Config{
	Model:         common.MetricsFiltersParams{},
	FieldSep:      ".",
	LimitMaxValue: 25,
})

func (h Handlers) GetFlamegraph(c *gin.Context) {
	params, query, err := parseParams(common.FlameGraphParams{}, QueryParser, c)
	if err != nil {
		return
	}

	start := c.GetTime("requestStartTime")
	graph, err := h.ChClient.GetTopFrames(c.Request.Context(), params, query)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}
	olapTime := float64(time.Since(start)) / float64(time.Second)
	runtimes := make(map[string]float64)

	if graph.EnrichWithLang {
		runtimes = db.CalcRuntimesDistribution(&graph)
	}

	switch params.Format {
	case "flamegraph":
		total, final := graph.BuildFlameGraph()
		percentiles := graph.GetPercentiles()

		result := FlameGraphResponse{
			Name:        "root",
			Value:       total,
			Children:    final,
			OlapTime:    olapTime,
			Percentiles: percentiles,
		}
		result.SetExecTime(start)

		c.JSON(http.StatusOK, result)
	case "collapsed_file":
		ch := make(chan string)
		go graph.BuildCollapsedFile(ch, runtimes)
		lineNum := 0
		c.Stream(func(w io.Writer) bool {
			line, more := <-ch
			if !more {
				if lineNum == 0 {
					c.Writer.WriteHeader(http.StatusNoContent)
				}
				return false
			}
			c.Writer.Write([]byte(line))
			lineNum += 1
			return true
		})
		// Read rest of data in channel if exist
		for {
			_, more := <-ch
			if !more {
				break
			}
		}
	default:
		c.String(http.StatusBadRequest, "Unknown format")
	}
}

func (h Handlers) QueryMeta(c *gin.Context) {
	var response ExecTimeInterface
	params, query, err := parseParams(common.QueryParams{}, QueryParser, c)
	if err != nil {
		return
	}

	mapping := map[string]string{
		"container":        "ContainerName",
		"hostname":         "HostName",
		"instance_type":    "InstanceType",
		"k8s_obj":          "ContainerEnvName",
		"ContainerName":    "ContainerName",
		"HostName":         "HostName",
		"InstanceType":     "InstanceType",
		"ContainerEnvName": "ContainerEnvName",
	}

	ctx := c.Request.Context()
	switch params.LookupFor {
	case "HostName", "hostname", "InstanceType", "instance_type":
		response = &FieldValueSampleResponse{
			Result: h.ChClient.FetchFieldValues(ctx, mapping[params.LookupFor], params, query),
		}
	case "ContainerEnvName", "k8s_obj", "ContainerName", "container":
		response = &FieldValueSampleResponse{
			Result: h.ChClient.FetchFieldValueSample(ctx, mapping[params.LookupFor], params, query),
		}

	case "instance_type_count":
		response = &InstanceTypeCountResponse{
			Result: h.ChClient.FetchInstanceTypeCount(ctx, params, query),
		}

	case "time":
		response = &QueryResponse{
			Result: h.ChClient.FetchTimes(ctx, params, query),
		}
	case "time_range":
		response = &QueryResponse{
			Result: h.ChClient.FetchTimeRange(ctx, params, query),
		}
	case "samples":
		response = &SampleCountResponse{
			Result: h.ChClient.FetchSampleCount(ctx, params, query),
		}
	case "samples_count_by_function":
		if len(params.FunctionName) > 0 {
			response = &SampleCountByFunctionResponse{
				Result: h.ChClient.FetchSampleCountByFunction(ctx, params, query),
			}
		} else {
			c.JSON(http.StatusBadRequest, "missing function name")
		}
	default:
		response = &QueryResponse{
			Result: make([]string, 0),
		}
	}
	response.SetExecTime(c.GetTime("requestStartTime"))
	c.JSON(http.StatusOK, response)
}

func (h Handlers) QueryServices(c *gin.Context) {
	params, _, err := parseParams(common.ServicesParams{}, nil, c)
	if err != nil {
		return
	}

	ctx := c.Request.Context()
	response := ServiceResponse{
		Result: h.ChClient.FetchServices(ctx, params),
	}
	response.SetExecTime(c.GetTime("requestStartTime"))
	c.JSON(http.StatusOK, response)
}

func (h Handlers) QuerySessionsCount(c *gin.Context) {
	params, query, err := parseParams(common.SessionsCountParams{}, QueryParser, c)
	if err != nil {
		return
	}
	ctx := c.Request.Context()
	response := SessionsResponse{}
	result, err := h.ChClient.FetchSessionsCount(ctx, params, query)
	response.SetExecTime(c.GetTime("requestStartTime"))
	if err == nil {
		response.Result = result
		c.JSON(http.StatusOK, response)
	} else {
		c.JSON(http.StatusNoContent, err)
	}
}

func (h Handlers) GetMetricsSummary(c *gin.Context) {
	params, query, err := parseParams(common.MetricsSummaryParams{}, MetricsQueryParser, c)
	if err != nil {
		return
	}
	ctx := c.Request.Context()

	if fetchResponse, err := h.ChClient.FetchMetricsSummary(ctx, params, query); err != nil {
		log.Print(err)
		c.Status(http.StatusNoContent)
		return
	} else {
		response := MetricsSummaryResponse{
			Result: fetchResponse,
		}
		response.SetExecTime(c.GetTime("requestStartTime"))
		c.JSON(http.StatusOK, response)
	}

}

func (h Handlers) GetMetricsServicesListSummary(c *gin.Context) {
	body := common.MetricsServicesListSummaryParams{}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := c.ShouldBindQuery(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx := c.Request.Context()

	if fetchResponse, err := h.ChClient.FetchMetricsServicesListSummary(ctx, body); err != nil {
		log.Print(err)
		c.Status(http.StatusNoContent)
		return
	} else {
		response := MetricsServicesListSummaryResponse{
			Result: fetchResponse,
		}
		response.SetExecTime(c.GetTime("requestStartTime"))
		c.JSON(http.StatusOK, response)
	}

}

func (h Handlers) GetMetricsGraph(c *gin.Context) {
	params, query, err := parseParams(common.MetricsSummaryParams{}, MetricsQueryParser, c)
	if err != nil {
		return
	}
	ctx := c.Request.Context()

	if fetchResponse, err := h.ChClient.FetchMetricsGraph(ctx, params, query); err != nil {
		log.Print(err)
		c.Status(http.StatusNoContent)
		return
	} else {
		response := MetricsGraphResponse{
			Result: fetchResponse,
		}
		response.SetExecTime(c.GetTime("requestStartTime"))
		c.JSON(http.StatusOK, response)
	}
}

func (h Handlers) GetMetricsCpuTrends(c *gin.Context) {
	params, query, err := parseParams(common.MetricsCpuTrendParams{}, MetricsQueryParser, c)
	if err != nil {
		return
	}
	ctx := c.Request.Context()

	if fetchResponse, err := h.ChClient.FetchMetricsCpuTrend(ctx, params, query); err != nil {
		log.Print(err)
		c.Status(http.StatusNoContent)
		return
	} else {
		response := MetricsCpuResponse{
			Result: fetchResponse,
		}
		response.SetExecTime(c.GetTime("requestStartTime"))
		c.JSON(http.StatusOK, response)
	}
}