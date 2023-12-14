-- INTEL CONFIDENTIAL
-- Copyright (C) 2023 Intel Corporation
-- This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
-- This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

-- noinspection SqlNoDataSourceInspectionForFile

-- create database on cluster
CREATE DATABASE IF NOT EXISTS
    flamedb;


-- create raw table samples local
CREATE TABLE IF NOT EXISTS flamedb.samples
(
    Timestamp          DateTime('UTC') CODEC (DoubleDelta),
    ServiceId          UInt32,
    InstanceType       LowCardinality(String),
    ContainerEnvName   LowCardinality(String),
    HostName           LowCardinality(String),
    ContainerName      LowCardinality(String),
    NumSamples         UInt32 CODEC (DoubleDelta),
    CallStackHash      UInt64,
    HostNameHash       UInt32 MATERIALIZED xxHash32(HostName),
    ContainerNameHash  UInt32 MATERIALIZED xxHash32(ContainerName),
    CallStackName      String CODEC (ZSTD),
    CallStackParent    UInt64,
    InsertionTimestamp DateTime('UTC') CODEC (DoubleDelta),
    ErrNumSamples      UInt32
) engine = MergeTree() PARTITION BY toYYYYMMDD(Timestamp)
      ORDER BY (ServiceId, InstanceType, ContainerEnvName, HostNameHash, ContainerNameHash, Timestamp);

-- create raw table metrics local
CREATE TABLE IF NOT EXISTS flamedb.metrics
(
    Timestamp                DateTime('UTC') CODEC (DoubleDelta),
    ServiceId                UInt32,
    InstanceType             LowCardinality(String),
    HostName                 LowCardinality(String),
    HostNameHash             UInt32 MATERIALIZED xxHash32(HostName),
    CPUAverageUsedPercent    Float64,
    MemoryAverageUsedPercent Float64
) engine = MergeTree() PARTITION BY toYYYYMMDD(Timestamp)
      ORDER BY (ServiceId, InstanceType, HostNameHash, Timestamp);


-- create 60min aggregated table all hostnames and all containers
CREATE TABLE IF NOT EXISTS flamedb.samples_1hour_all
(
    Timestamp DateTime('UTC') CODEC(DoubleDelta),
    ServiceId UInt32,
    CallStackHash     UInt64,
    CallStackName     String CODEC (ZSTD),
    CallStackParent   UInt64,
    InsertionTimestamp DateTime('UTC') CODEC(DoubleDelta),
    NumSamples UInt64 CODEC(DoubleDelta),
    ErrNumSamples      UInt32
) ENGINE = SummingMergeTree((NumSamples))
        PARTITION BY toYYYYMMDD(Timestamp)
        ORDER BY (ServiceId, Timestamp, CallStackHash, CallStackParent);

CREATE MATERIALIZED VIEW IF NOT EXISTS
    flamedb.samples_1hour_all_mv TO flamedb.samples_1hour_all
AS
SELECT toStartOfHour(Timestamp)    AS Timestamp,
       ServiceId,
       CallStackHash,
       any(CallStackName)          as CallStackName,
       any(CallStackParent)        as CallStackParent,
       sum(NumSamples)             AS NumSamples,
       sum(ErrNumSamples)          AS ErrNumSamples,
       anyLast(InsertionTimestamp) as InsertionTimestamp
FROM flamedb.samples
GROUP BY ServiceId, CallStackHash, Timestamp;



-- create 60min aggregated table
CREATE TABLE IF NOT EXISTS flamedb.samples_1hour
(
    Timestamp DateTime('UTC') CODEC(DoubleDelta),
    ServiceId UInt32,
    InstanceType      LowCardinality(String),
    ContainerEnvName  LowCardinality(String),
    HostName          LowCardinality(String),
    ContainerName     LowCardinality(String),
    CallStackHash     UInt64,
    CallStackName     String CODEC (ZSTD),
    CallStackParent   UInt64,
    InsertionTimestamp DateTime('UTC') CODEC(DoubleDelta),
    NumSamples UInt64 CODEC(DoubleDelta),
    ErrNumSamples      UInt32,
) ENGINE = SummingMergeTree((NumSamples))
        PARTITION BY toYYYYMMDD(Timestamp)
        ORDER BY (ServiceId, ContainerEnvName, InstanceType, HostName, ContainerName,
        Timestamp, CallStackHash, CallStackParent);

CREATE MATERIALIZED VIEW IF NOT EXISTS
    flamedb.samples_1hour_mv TO flamedb.samples_1hour
AS
SELECT toStartOfHour(Timestamp)    AS Timestamp,
       ServiceId,
       ContainerEnvName,
       InstanceType,
       HostName,
       ContainerName,
       CallStackHash,
       any(CallStackName)          as CallStackName,
       any(CallStackParent)        as CallStackParent,
       sum(NumSamples)             AS NumSamples,
       sum(ErrNumSamples)          AS ErrNumSamples,
       anyLast(InsertionTimestamp) as InsertionTimestamp
FROM flamedb.samples
GROUP BY ServiceId, InstanceType, ContainerEnvName, HostName, ContainerName,
         CallStackHash, Timestamp;


-- create distributed 24h table all hostnames and all containers
CREATE TABLE IF NOT EXISTS flamedb.samples_1day_all
(
    Timestamp DateTime('UTC') CODEC(DoubleDelta),
    ServiceId UInt32,
    CallStackHash     UInt64,
    CallStackName     String CODEC (ZSTD),
    CallStackParent   UInt64,
    InsertionTimestamp DateTime('UTC') CODEC(DoubleDelta),
    NumSamples UInt64 CODEC(DoubleDelta),
    ErrNumSamples      UInt32
) ENGINE = SummingMergeTree((NumSamples))
                PARTITION BY toYYYYMMDD(Timestamp)
                ORDER BY (ServiceId, Timestamp, CallStackHash, CallStackParent);


CREATE MATERIALIZED VIEW IF NOT EXISTS
    flamedb.samples_1day_all_mv to flamedb.samples_1day_all
AS
SELECT toStartOfDay(Timestamp)     AS Timestamp,
       ServiceId,
       CallStackHash,
       any(CallStackName)          as CallStackName,
       any(CallStackParent)        as CallStackParent,
       sum(NumSamples)             AS NumSamples,
       sum(ErrNumSamples)          AS ErrNumSamples,
       anyLast(InsertionTimestamp) as InsertionTimestamp
FROM flamedb.samples
GROUP BY ServiceId, CallStackHash, Timestamp;


-- create 1day aggregated table
CREATE TABLE IF NOT EXISTS flamedb.samples_1day
(
    Timestamp DateTime('UTC') CODEC(DoubleDelta),
    ServiceId UInt32,
    InstanceType      LowCardinality(String),
    ContainerEnvName  LowCardinality(String),
    HostName          LowCardinality(String),
    ContainerName     LowCardinality(String),
    CallStackHash     UInt64,
    CallStackName     String CODEC (ZSTD),
    CallStackParent   UInt64,
    InsertionTimestamp DateTime('UTC') CODEC(DoubleDelta),
    NumSamples UInt64 CODEC(DoubleDelta),
    ErrNumSamples      UInt32
) ENGINE = SummingMergeTree((NumSamples))
    PARTITION BY toYYYYMMDD(Timestamp)
    ORDER BY (ServiceId, ContainerEnvName, InstanceType, HostName, ContainerName,
    Timestamp, CallStackHash, CallStackParent);


CREATE MATERIALIZED VIEW IF NOT EXISTS
    flamedb.samples_1day_mv TO flamedb.samples_1day
AS
SELECT toStartOfDay(Timestamp)     AS Timestamp,
       ServiceId,
       ContainerEnvName,
       InstanceType,
       HostName,
       ContainerName,
       CallStackHash,
       any(CallStackName)          as CallStackName,
       any(CallStackParent)        as CallStackParent,
       sum(NumSamples)             AS NumSamples,
       sum(ErrNumSamples)          AS ErrNumSamples,
       anyLast(InsertionTimestamp) as InsertionTimestamp
FROM flamedb.samples
GROUP BY ServiceId, InstanceType, ContainerEnvName, HostName, ContainerName,
         CallStackHash, Timestamp;


-- create local table
CREATE TABLE IF NOT EXISTS flamedb.samples_1min (
    Timestamp DateTime('UTC') CODEC(DoubleDelta),
    ServiceId UInt32,
    InstanceType LowCardinality(String),
    ContainerEnvName LowCardinality(String),
    HostName LowCardinality(String),
    ContainerName LowCardinality(String),
    NumSamples UInt64 CODEC(DoubleDelta),
    ErrNumSamples UInt64,
    HostNameHash UInt32,
    ContainerNameHash UInt32,
    InsertionTimestamp DateTime('UTC') CODEC(DoubleDelta)
) ENGINE = SummingMergeTree((NumSamples))
      PARTITION BY toYYYYMMDD(Timestamp)
      ORDER BY (ServiceId, ContainerEnvName, InstanceType, ContainerNameHash, HostNameHash, Timestamp);

-- create mv
CREATE MATERIALIZED VIEW IF NOT EXISTS flamedb.samples_1min_mv TO
    flamedb.samples_1min
AS SELECT toStartOfMinute(Timestamp) AS
          Timestamp,
          ServiceId,
          InstanceType,
          ContainerEnvName,
          HostName,
          ContainerName,
          sum(NumSamples) AS NumSamples,
          sum(ErrNumSamples) AS ErrNumSamples,
          HostNameHash,
          ContainerNameHash,
          anyLast(InsertionTimestamp) as InsertionTimestamp
   FROM flamedb.samples WHERE CallStackParent = 0
   GROUP BY ServiceId, InstanceType, ContainerEnvName, HostName, ContainerName, HostNameHash, ContainerNameHash, Timestamp;

ALTER TABLE flamedb.samples
    MODIFY TTL "Timestamp" + INTERVAL 30 DAY;

ALTER TABLE flamedb.samples_1hour
    MODIFY TTL "Timestamp" + INTERVAL 30 DAY;

ALTER TABLE flamedb.samples_1hour_all
    MODIFY TTL "Timestamp" + INTERVAL 30 DAY;

ALTER TABLE flamedb.samples_1day_all
    MODIFY TTL "Timestamp" + INTERVAL 30 DAY;

ALTER TABLE flamedb.samples_1day
   MODIFY TTL "Timestamp" + INTERVAL 365 DAY;
