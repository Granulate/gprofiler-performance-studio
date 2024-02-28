package handlers

import (
	"restflamedb/common"
	"restflamedb/db"
	"time"
)

type ExecTimeInterface interface {
	SetExecTime(time.Time)
}

type ExecTimeResponse struct {
	ExecTime float64 `json:"exec_time"`
}

func (et *ExecTimeResponse) SetExecTime(start time.Time) {
	et.ExecTime = float64(time.Since(start)) / float64(time.Second)
}

type QueryResponse struct {
	Result []string `json:"result"`
	ExecTimeResponse
}

type AnyResponse struct {
	Result any `json:"result"`
	ExecTimeResponse
}

type ServiceResponse struct {
	Result []db.SrvResp `json:"result"`
	ExecTimeResponse
}

type SessionsResponse struct {
	Result int `json:"result"`
	ExecTimeResponse
}

type MetricsSummaryResponse struct {
	Result common.MetricsSummary `json:"result"`
	ExecTimeResponse
}

type MetricsServicesListSummaryResponse struct {
	Result []common.MetricsServicesListSummary `json:"result"`
	ExecTimeResponse
}

type SampleCountResponse struct {
	Result []common.Sample `json:"result"`
	ExecTimeResponse
}

type SampleCountByFunctionResponse struct {
	Result []common.SamplesCountByFunction `json:"result"`
	ExecTimeResponse
}

type InstanceTypeCountResponse struct {
	Result []common.InstanceTypeCount `json:"result"`
	ExecTimeResponse
}

type FieldValueSampleResponse struct {
	Result []common.FilterData `json:"result"`
	ExecTimeResponse
}

type MetricsGraphResponse struct {
	Result []common.MetricsSummary `json:"result"`
	ExecTimeResponse
}

type MetricsCpuResponse struct {
	Result common.MetricsCpuTrend `json:"result"`
	ExecTimeResponse
}

type FlameGraphResponse struct {
	Name     string             `json:"name"`
	Value    int                `json:"value"`
	Children []db.ResponseFrame `json:"children"`
	ExecTimeResponse
	OlapTime    float64           `json:"olap_time"`
	Percentiles map[string]string `json:"percentiles"`
}
