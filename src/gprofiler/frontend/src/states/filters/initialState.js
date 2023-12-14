{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
