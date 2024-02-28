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
