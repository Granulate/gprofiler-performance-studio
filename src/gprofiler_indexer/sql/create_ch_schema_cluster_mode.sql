-- INTEL CONFIDENTIAL
-- Copyright (C) 2023 Intel Corporation
-- This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
-- This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

-- noinspection SqlNoDataSourceInspectionForFile

-- create database on cluster
CREATE DATABASE IF NOT EXISTS
    flamedb
    ON CLUSTER '{cluster}';


-- create raw table samples local
CREATE TABLE IF NOT EXISTS flamedb.samples_local ON CLUSTER '{cluster}'
(
    Timestamp         DateTime CODEC (DoubleDelta),
    ServiceId         UInt32,
    InstanceType      LowCardinality(String),
    ContainerEnvName  LowCardinality(String),
    HostName          LowCardinality(String),
    ContainerName     LowCardinality(String),
    NumSamples        UInt32 CODEC (DoubleDelta),
    CallStackHash     UInt64,
    HostNameHash      UInt32 MATERIALIZED xxHash32(HostName),
    ContainerNameHash UInt32 MATERIALIZED xxHash32(ContainerName),
    CallStackName     String CODEC (ZSTD),
    CallStackParent   UInt64,
    InsertionTimestamp DateTime CODEC(DoubleDelta),
    ErrNumSamples      UInt32
    ) engine = ReplicatedMergeTree('/clickhouse/{installation}/{cluster}/tables/{shard}/{database}/{table}',
                                   '{replica}') PARTITION BY toYYYYMMDD(Timestamp)
    ORDER BY (ServiceId, InstanceType, ContainerEnvName, HostNameHash, ContainerNameHash, Timestamp);

-- Sharding key is CallStackHash
CREATE TABLE IF NOT EXISTS
    flamedb.samples
    ON CLUSTER '{cluster}' AS
    flamedb.samples_local
    ENGINE = Distributed('{cluster}', flamedb, samples_local, CallStackHash);


-- create raw table metrics local
CREATE TABLE IF NOT EXISTS flamedb.metrics_local ON CLUSTER '{cluster}'
(
    Timestamp                DateTime CODEC (DoubleDelta),
    ServiceId                UInt32,
    InstanceType             LowCardinality(String),
    HostName                 LowCardinality(String),
    HostNameHash             UInt32 MATERIALIZED xxHash32(HostName),
    CPUAverageUsedPercent    Float64,
    MemoryAverageUsedPercent Float64
    ) engine = ReplicatedMergeTree('/clickhouse/{installation}/{cluster}/tables/{shard}/{database}/{table}',
                                   '{replica}') PARTITION BY toYYYYMMDD(Timestamp)
    ORDER BY (ServiceId, InstanceType, HostNameHash, Timestamp);

CREATE TABLE IF NOT EXISTS
    flamedb.metrics
    ON CLUSTER '{cluster}' AS
    flamedb.metrics_local
    ENGINE = Distributed('{cluster}', flamedb, metrics_local, ServiceId);



-- 1) create 1hour aggregated table all hostnames and all containers
CREATE TABLE IF NOT EXISTS flamedb.samples_1hour_all_local_store ON CLUSTER '{cluster}' (
    Timestamp DateTime CODEC(DoubleDelta),
    ServiceId UInt32,
    CallStackHash     UInt64,
    CallStackName     String CODEC (ZSTD),
    CallStackParent   UInt64,
    InsertionTimestamp DateTime CODEC(DoubleDelta),
    NumSamples UInt64 CODEC(DoubleDelta),
    ErrNumSamples      UInt32
    ) ENGINE = ReplicatedSummingMergeTree('/clickhouse/{installation}/{cluster}/tables/{shard}/{database}/{table}', '{replica}', (NumSamples))
    PARTITION BY toYYYYMMDD(Timestamp)
    ORDER BY (ServiceId, Timestamp, CallStackHash, CallStackParent);

CREATE MATERIALIZED VIEW IF NOT EXISTS flamedb.samples_1hour_all_local ON CLUSTER '{cluster}' TO
    flamedb.samples_1hour_all_local_store AS
SELECT toStartOfHour(Timestamp) AS Timestamp,
       ServiceId,
       CallStackHash,
       any(CallStackName)          as CallStackName,
       any(CallStackParent)        as CallStackParent,
       sum(NumSamples)             as NumSamples,
       sum(ErrNumSamples)          as ErrNumSamples,
       anyLast(InsertionTimestamp) as InsertionTimestamp
FROM flamedb.samples_local
GROUP BY ServiceId, CallStackHash, Timestamp;

CREATE TABLE IF NOT EXISTS
    flamedb.samples_1hour_all
    ON CLUSTER '{cluster}' AS
    flamedb.samples_1hour_all_local
    ENGINE = Distributed('{cluster}', flamedb, samples_1hour_all_local, CallStackHash);


-- 2) create 1hour aggregated table
CREATE TABLE IF NOT EXISTS flamedb.samples_1hour_local_store ON CLUSTER '{cluster}' (
    Timestamp DateTime CODEC(DoubleDelta),
    ServiceId UInt32,
    InstanceType      LowCardinality(String),
    ContainerEnvName  LowCardinality(String),
    HostName          LowCardinality(String),
    ContainerName     LowCardinality(String),
    CallStackHash     UInt64,
    CallStackName     String CODEC (ZSTD),
    CallStackParent   UInt64,
    InsertionTimestamp DateTime CODEC(DoubleDelta),
    NumSamples UInt64 CODEC(DoubleDelta),
    ErrNumSamples      UInt32
    ) ENGINE = ReplicatedSummingMergeTree('/clickhouse/{installation}/{cluster}/tables/{shard}/{database}/{table}', '{replica}', (NumSamples))
    PARTITION BY toYYYYMMDD(Timestamp)
    ORDER BY (ServiceId, ContainerEnvName, InstanceType, Timestamp, CallStackHash, CallStackParent);

CREATE MATERIALIZED VIEW IF NOT EXISTS flamedb.samples_1hour_local ON CLUSTER '{cluster}' TO
    flamedb.samples_1hour_local_store AS
SELECT toStartOfHour(Timestamp) AS Timestamp,
       ServiceId,
       ContainerEnvName,
       InstanceType,
       ContainerNameHash,
       HostNameHash,
       HostName,
       ContainerName,
       CallStackHash,
       any(CallStackName)          as CallStackName,
       any(CallStackParent)        as CallStackParent,
       sum(NumSamples)             as NumSamples,
       sum(ErrNumSamples)          as ErrNumSamples,
       anyLast(InsertionTimestamp) as InsertionTimestamp
FROM flamedb.samples_local
GROUP BY ServiceId, InstanceType, ContainerEnvName, HostName, ContainerName, HostNameHash, ContainerNameHash,
    CallStackHash, Timestamp;

CREATE TABLE IF NOT EXISTS
    flamedb.samples_1hour
    ON CLUSTER '{cluster}' AS
    flamedb.samples_1hour_local
    ENGINE = Distributed('{cluster}', flamedb, samples_1hour_local, CallStackHash);


-- 3) create 1day aggregated table MV
CREATE TABLE IF NOT EXISTS flamedb.samples_1day_local_store ON CLUSTER '{cluster}' (
    Timestamp DateTime CODEC(DoubleDelta),
    ServiceId UInt32,
    InstanceType      LowCardinality(String),
    ContainerEnvName  LowCardinality(String),
    HostName          LowCardinality(String),
    ContainerName     LowCardinality(String),
    CallStackHash     UInt64,
    CallStackName     String CODEC (ZSTD),
    CallStackParent   UInt64,
    InsertionTimestamp DateTime CODEC(DoubleDelta),
    NumSamples UInt64 CODEC(DoubleDelta),
    ErrNumSamples      UInt32
    ) ENGINE = ReplicatedSummingMergeTree('/clickhouse/{installation}/{cluster}/tables/{shard}/{database}/{table}', '{replica}', (NumSamples))
    PARTITION BY toYYYYMMDD(Timestamp)
    ORDER BY (ServiceId, ContainerEnvName, InstanceType, Timestamp, CallStackHash, CallStackParent);


CREATE MATERIALIZED VIEW IF NOT EXISTS flamedb.samples_1day_local ON CLUSTER '{cluster}' TO
    flamedb.samples_1day_local_store AS
SELECT toStartOfDay(Timestamp) AS Timestamp,
       ServiceId,
       ContainerEnvName,
       InstanceType,
       ContainerNameHash,
       HostNameHash,
       HostName,
       ContainerName,
       CallStackHash,
       any(CallStackName)          as CallStackName,
       any(CallStackParent)        as CallStackParent,
       sum(NumSamples)             as NumSamples,
       sum(ErrNumSamples)          as ErrNumSamples,
       anyLast(InsertionTimestamp) as InsertionTimestamp
FROM flamedb.samples_local
GROUP BY ServiceId, InstanceType, ContainerEnvName, HostName, ContainerName, HostNameHash, ContainerNameHash,
    CallStackHash, Timestamp;

CREATE TABLE IF NOT EXISTS
    flamedb.samples_1day
    ON CLUSTER '{cluster}' AS
    flamedb.samples_1day_local
    ENGINE = Distributed('{cluster}', flamedb, samples_1day_local, CallStackHash);


-- 4) create 1day all aggregated table
CREATE TABLE IF NOT EXISTS flamedb.samples_1day_all_local_store ON CLUSTER '{cluster}' (
    Timestamp DateTime CODEC(DoubleDelta),
    ServiceId UInt32,
    CallStackHash     UInt64,
    CallStackName     String CODEC (ZSTD),
    CallStackParent   UInt64,
    InsertionTimestamp DateTime CODEC(DoubleDelta),
    NumSamples UInt64 CODEC(DoubleDelta),
    ErrNumSamples      UInt32
    ) ENGINE = ReplicatedSummingMergeTree('/clickhouse/{installation}/{cluster}/tables/{shard}/{database}/{table}', '{replica}', (NumSamples))
    PARTITION BY toYYYYMMDD(Timestamp)
    ORDER BY (ServiceId, Timestamp, CallStackHash, CallStackParent);
    

CREATE MATERIALIZED VIEW IF NOT EXISTS flamedb.samples_1day_all_local ON CLUSTER '{cluster}' TO
    flamedb.samples_1day_all_local_store AS
SELECT toStartOfDay(Timestamp) AS Timestamp,
       ServiceId,
       CallStackHash,
       any(CallStackName)          as CallStackName,
       any(CallStackParent)        as CallStackParent,
       sum(NumSamples)             as NumSamples,
       sum(ErrNumSamples)          as ErrNumSamples,
       anyLast(InsertionTimestamp) as InsertionTimestamp
FROM flamedb.samples_local
GROUP BY ServiceId, CallStackHash, Timestamp;

CREATE TABLE IF NOT EXISTS
    flamedb.samples_1day_all
    ON CLUSTER '{cluster}' AS
    flamedb.samples_1day_all_local
    ENGINE = Distributed('{cluster}', flamedb, samples_1day_all_local, CallStackHash);


-- 5) create local 1min table
CREATE TABLE IF NOT EXISTS flamedb.samples_1min_local ON CLUSTER '{cluster}' (
    Timestamp DateTime CODEC(DoubleDelta),
    ServiceId UInt32,
    InstanceType LowCardinality(String),
    ContainerEnvName LowCardinality(String),
    HostName LowCardinality(String),
    ContainerName LowCardinality(String),
    NumSamples UInt64 CODEC(DoubleDelta),
    HostNameHash UInt32,
    ContainerNameHash UInt32,
    InsertionTimestamp DateTime CODEC(DoubleDelta)
    ) ENGINE = ReplicatedSummingMergeTree('/clickhouse/{installation}/{cluster}/tables/{shard}/{database}/{table}', '{replica}', (NumSamples))
    PARTITION BY toYYYYMMDD(Timestamp)
    ORDER BY (ServiceId, ContainerEnvName, InstanceType, ContainerNameHash, HostNameHash, Timestamp);

-- create mv
CREATE MATERIALIZED VIEW IF NOT EXISTS flamedb.samples_1min_mv ON CLUSTER '{cluster}' TO
    flamedb.samples_1min_local
AS SELECT toStartOfMinute(Timestamp) AS
          Timestamp,
          ServiceId,
          InstanceType,
          ContainerEnvName,
          HostName,
          ContainerName,
          sum(NumSamples) AS NumSamples,
          HostNameHash,
          ContainerNameHash,
          anyLast(InsertionTimestamp) as InsertionTimestamp
   FROM flamedb.samples_local WHERE CallStackParent = 0
   GROUP BY ServiceId, InstanceType, ContainerEnvName, HostName, ContainerName, HostNameHash, ContainerNameHash, Timestamp;

-- create distributed table
CREATE TABLE IF NOT EXISTS
    flamedb.samples_1min
    ON CLUSTER '{cluster}' AS flamedb.samples_1min_local
    ENGINE = Distributed('{cluster}', flamedb, samples_1min_local);
