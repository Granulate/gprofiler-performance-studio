

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
