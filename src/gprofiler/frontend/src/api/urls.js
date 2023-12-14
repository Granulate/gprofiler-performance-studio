{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { stringify } from 'query-string';

const API_PREFIX = '/api';
const FILETERS_PREFIX = '/v1/filters';

export const DATA_URLS = {
    INSTALLATION_DAEMON: `${API_PREFIX}/installations/daemon_set/file?`,
    GET_SERVICES_SUMMARY: `${API_PREFIX}/overview`,
    GET_SERVICES_DATA: `${API_PREFIX}/overview/services`,
    GET_SERVICES_LIST: `${API_PREFIX}/services`,
    GET_FLAMEGRAPH: `${API_PREFIX}/flamegraph`,
    DOWNLOAD_FLAMEGRAPH: `${API_PREFIX}/flamegraph/download_`,
    GET_FLAMEGRAPH_DATETIME_WITH_DATA: `${API_PREFIX}/flamegraph/datetime_with_data`,
    GET_METRICS: `${API_PREFIX}/metrics/summary`,
    GET_METRICS_CPU_AND_MEMORY_TREND: `${API_PREFIX}/metrics/cpu_trend`,
    GET_NODES_AND_CORES: `${API_PREFIX}/metrics/nodes_cores/summary`,
    GET_INSTANCE_TYPE: `${API_PREFIX}/metrics/instance_type_count`,
    GET_GRAPH_METRICS: `${API_PREFIX}/metrics/graph`,
    GET_FUCNTION_CPU_GRAPH: `${API_PREFIX}/metrics/function_cpu`,
    GET_NODES_AND_CORES_GRAPH_METRICS: `${API_PREFIX}/metrics/graph/nodes_and_cores`,
    GET_SAMPLES: `${API_PREFIX}/metrics/samples`,
    GET_API_KEY: `${API_PREFIX}/api_key`,
    FILTERS: `${API_PREFIX}${FILETERS_PREFIX}`,
    GET_FILTER_OPTIONS_VALUE: (filterType, params) =>
        `${API_PREFIX}${FILETERS_PREFIX}/tags/${filterType}?${stringify(params)}`,
    GET_FILTERS_FOR_SERVICE: (selectedService) => `${API_PREFIX}${FILETERS_PREFIX}/service/${selectedService}`,
    SNAPSHOT: `${API_PREFIX}/snapshots`,
};
