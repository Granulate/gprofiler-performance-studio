{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

export const MAP_TIME_TO_FILTER_QUERY = {
    '15min': '15min',
    '30min': '30min',
    hourly: '1h',
    '6h': '6h',
    daily: '1d',
    weekly: '1w',
};

export const MAP_FILTER_QUERY_TO_TIME = {
    '15min': '15min',
    '30min': '30min',
    '1h': 'hourly',
    '6h': '6h',
    '1d': 'daily',
    '1w': 'weekly',
};

export const TIME_QUERY_PARAMS = Object.keys(MAP_FILTER_QUERY_TO_TIME);

export const isDateQueryParamsExists = (timeQueryParam) => {
    return Object.prototype.hasOwnProperty.call(MAP_FILTER_QUERY_TO_TIME, timeQueryParam);
};
