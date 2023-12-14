// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"github.com/ClickHouse/clickhouse-go/v2"
	"sync"
	"time"
)

type StackRecord struct {
	Timestamp          time.Time
	ServiceId          uint32
	InstanceType       string
	ContainerEnvName   string
	HostName           string
	ContainerName      string
	NumSamples         int
	CallStackHash      uint64
	HasParent          string
	Name               string
	Parent             uint64
	InsertionTimestamp time.Time
}

type MetricRecord struct {
	Timestamp                time.Time
	ServiceId                uint32
	InstanceType             string
	HostName                 string
	CPUAverageUsedPercent    float64
	MemoryAverageUsedPercent float64
}

type RecordsAttributesUnpack interface {
	getDbAttributes() []interface{}
}

func (mr MetricRecord) getDbAttributes() []interface{} {
	dbAttributes := []interface{}{
		mr.Timestamp,
		mr.ServiceId,
		mr.InstanceType,
		mr.HostName,
		mr.CPUAverageUsedPercent,
		mr.MemoryAverageUsedPercent,
	}
	return dbAttributes
}

func (sr StackRecord) getDbAttributes() []interface{} {
	dbAttributes := []interface{}{
		sr.Timestamp,
		sr.ServiceId,
		sr.InstanceType,
		sr.ContainerEnvName,
		sr.HostName,
		sr.ContainerName,
		uint32(sr.NumSamples),
		sr.CallStackHash,
		sr.Name,
		sr.Parent,
		sr.InsertionTimestamp,
		uint32(0),
	}
	return dbAttributes
}

type ClickHouseClient struct {
	conn clickhouse.Conn
}

type ClickHouseSettings struct {
	Addr                   string
	Username               string
	Password               string
	Database               string
	UseTLS                 bool
	ClickHouseStacksTable  string
	ClickHouseMetricsTable string
}

func NewClickHouseClient(settings *ClickHouseSettings) (*ClickHouseClient, error) {
	logger.Debugf("Connecting to ClickHouse: %s", settings.Addr)
	var tlsCfg *tls.Config
	if settings.UseTLS {
		tlsCfg = &tls.Config{}
	}
	conn, err := clickhouse.Open(&clickhouse.Options{
		Addr: []string{settings.Addr},
		Auth: clickhouse.Auth{
			Database: settings.Database,
			Username: settings.Username,
			Password: settings.Password,
		},
		TLS:   tlsCfg,
		Debug: false,
		Debugf: func(format string, v ...interface{}) {
			fmt.Printf(format, v)
		},
		Settings: clickhouse.Settings{
			"max_execution_time": 60,
		},
		Compression: &clickhouse.Compression{
			Method: clickhouse.CompressionLZ4,
		},
		DialTimeout:          time.Second * 30,
		MaxOpenConns:         5,
		MaxIdleConns:         5,
		ConnMaxLifetime:      time.Duration(10) * time.Minute,
		BlockBufferSize:      10,
		MaxCompressionBuffer: 10240,
	})
	if err != nil {
		logger.Errorf("unable to connect to clickhouse: %v", err)
		return nil, err
	}
	return &ClickHouseClient{
		conn: conn,
	}, nil
}

func (c *ClickHouseClient) clickHouseWrite(records []RecordsAttributesUnpack, tableName string) {
	if len(records) == 0 {
		return
	}
	ctx := context.Background()
	batch, err := c.conn.PrepareBatch(ctx, fmt.Sprintf("INSERT INTO %s", tableName))
	if err != nil {
		logger.Errorf("unable to prepare batch: %v", err)
		return
	}

	for _, temp := range records {
		if err = batch.Append(temp.getDbAttributes()...); err != nil {
			logger.Errorf("unable to append record to batch: %v", err)
		}
	}
	if err = batch.Send(); err != nil {
		logger.Errorf("unable to send batch: %v", err)
	} else {
		logger.Debugf("successfully sent %d records to %s", len(records), tableName)
	}
}

func BufferedClickHouseWrite(args *CLIArgs, channels *RecordChannels, wg *sync.WaitGroup) {
	defer wg.Done()
	logger.Debug("BufferedClickHouseWrite started")
	settings := ClickHouseSettings{
		Addr:                   args.ClickHouseAddr,
		Database:               "flamedb",
		Username:               args.ClickHouseUser,
		Password:               args.ClickHousePassword,
		ClickHouseMetricsTable: args.ClickHouseMetricsTable,
		ClickHouseStacksTable:  args.ClickHouseStacksTable,
	}
	clickhouseClient, err := NewClickHouseClient(&settings)
	if err != nil {
		logger.Fatal(err)
	}
	stacksTicker := time.NewTicker(time.Second * ClickHouseStacksFlushTimeout)
	metricsTicker := time.NewTicker(time.Second * ClickHouseMetricsFlushTimeout)
	buffRecords := make([]RecordsAttributesUnpack, 0)
	buffMetricsRecords := make([]RecordsAttributesUnpack, 0)

	for {
		select {
		case stackRecord, ok := <-channels.StacksRecords:
			if ok {
				buffRecords = append(buffRecords, stackRecord)
				if len(buffRecords) >= args.ClickHouseStacksBatchSize {
					clickhouseClient.clickHouseWrite(buffRecords, args.ClickHouseStacksTable)
					logger.Debugf("Flush %d stacks records to clickhouse", len(buffRecords))
					buffRecords = make([]RecordsAttributesUnpack, 0)
					stacksTicker.Reset(time.Second * ClickHouseStacksFlushTimeout)
				}
			} else {
				channels.StacksRecords = nil
			}
		case <-stacksTicker.C:
			clickhouseClient.clickHouseWrite(buffRecords, args.ClickHouseStacksTable)
			logger.Debugf("Flush %d stacks records to clickhouse on timeout %ds", len(buffRecords), ClickHouseStacksFlushTimeout)
			buffRecords = make([]RecordsAttributesUnpack, 0)
		case metricRecords, ok := <-channels.MetricsRecords:
			if ok {
				buffMetricsRecords = append(buffMetricsRecords, metricRecords)
				if len(buffMetricsRecords) >= args.ClickHouseMetricsBatchSize {
					clickhouseClient.clickHouseWrite(buffMetricsRecords, args.ClickHouseMetricsTable)
					logger.Debugf("Flush %d metrics records to clickhouse", len(buffMetricsRecords))
					buffMetricsRecords = make([]RecordsAttributesUnpack, 0)
					metricsTicker.Reset(time.Second * ClickHouseMetricsFlushTimeout)
				}
			} else {
				channels.MetricsRecords = nil
			}
		case <-metricsTicker.C:
			clickhouseClient.clickHouseWrite(buffMetricsRecords, args.ClickHouseMetricsTable)
			logger.Debugf("Flush %d metrics records to clickhouse on timeout %ds", len(buffMetricsRecords), ClickHouseMetricsFlushTimeout)
			buffMetricsRecords = make([]RecordsAttributesUnpack, 0)
		}
		if channels.StacksRecords == nil {
			stacksTicker.Stop()
		}
		if channels.MetricsRecords == nil {
			metricsTicker.Stop()
		}
		if channels.StacksRecords == nil && channels.MetricsRecords == nil {
			break
		}
	}
	// flush buffer on exit
	clickhouseClient.clickHouseWrite(buffRecords, args.ClickHouseStacksTable)
	clickhouseClient.clickHouseWrite(buffMetricsRecords, args.ClickHouseMetricsTable)
	logger.Debug("BufferedClickHouseWrite finished")
}
