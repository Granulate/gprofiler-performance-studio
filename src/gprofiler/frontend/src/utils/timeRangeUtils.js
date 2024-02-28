{/*
 * Copyright (C) 2023 Intel Corporation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
