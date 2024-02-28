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

import { getRuntimesList } from '../../utils/filtersUtils';

const initialState = {
    runtime: {
        allRuntimes: getRuntimesList(),
        filters: getRuntimesList().map((item) => item.name),
        isMixedRuntimeStacksModeEnabled: true,
    },
    processes: {
        filters: [],
        processesList: [],
    },
    weight: {
        threshold: null,
        percentile: 100,
        percentiles: [
            {
                percentile: 100,
                rangeStartPercentage: undefined,
                rangeEndPercentage: undefined,
            },
            {
                percentile: 50,
                rangeStartPercentage: undefined,
                rangeEndPercentage: undefined,
            },
            {
                percentile: 25,
                rangeStartPercentage: undefined,
                rangeEndPercentage: undefined,
            },
            {
                percentile: 5,
                rangeStartPercentage: undefined,
                rangeEndPercentage: undefined,
            },
            {
                percentile: 1,
                rangeStartPercentage: undefined,
                rangeEndPercentage: undefined,
            },
        ],
    },
};

export default initialState;
