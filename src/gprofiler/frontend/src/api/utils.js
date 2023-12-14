{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { formatDate, localDatetimeToUtc } from '../utils/datetimesUtils';
import { DEFAULT_INITIAL_TIME_RANGE_FILTER, TIME_RANGE_RELATIVE_DATE_METHOD } from '../utils/fgUtils';

export async function getJSON(response) {
    if (response.status === 204) return '';
    return response.json();
}

const getStartEndDateTimeFromSelection = (timeSelection, disableLocalization = false) => {
    const localEndTime = timeSelection?.customTime?.endTime || new Date();
    const localStartTime =
        timeSelection?.customTime?.startTime ||
        TIME_RANGE_RELATIVE_DATE_METHOD[timeSelection?.relativeTime || DEFAULT_INITIAL_TIME_RANGE_FILTER]();
    return {
        startTime: disableLocalization ? formatDate(localStartTime) : localDatetimeToUtc(localStartTime),
        endTime: disableLocalization ? formatDate(localEndTime) : localDatetimeToUtc(localEndTime),
    };
};

const ERROR_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_AUTHORIZED: 401,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
};

export { ERROR_CODES, getStartEndDateTimeFromSelection };
