

import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StringParam, useQueryParams } from 'use-query-params';

import { isValidDate } from '@/utils/datetimesUtils';

import { PAGES } from '../utils/consts';
import { DEFAULT_INITIAL_TIME_RANGE_FILTER } from '../utils/fgUtils';
import { isDateQueryParamsExists, MAP_FILTER_QUERY_TO_TIME, MAP_TIME_TO_FILTER_QUERY } from '../utils/timeRangeUtils';

const TIME_QUERY_PARAM = 'time';
const START_TIME_QUERY_PARAM = 'startTime';
const END_TIME_QUERY_PARAM = 'endTime';

const useTimePickQueryParams = ({ setTimeSelection, timeSelection, customQueryParams = undefined }) => {
    let location = useLocation();
    const TIME_QUERY = customQueryParams ? customQueryParams.time : TIME_QUERY_PARAM;
    const START_TIME_QUERY = customQueryParams ? customQueryParams.start : START_TIME_QUERY_PARAM;
    const END_TIME_QUERY = customQueryParams ? customQueryParams.end : END_TIME_QUERY_PARAM;

    const [queryParams, setQueryParams] = useQueryParams({
        [TIME_QUERY]: StringParam,
        [START_TIME_QUERY]: StringParam,
        [END_TIME_QUERY]: StringParam,
    });

    const time = queryParams[TIME_QUERY];
    const startTime = queryParams[START_TIME_QUERY];
    const endTime = queryParams[END_TIME_QUERY];

    const handleTimeChange = useCallback(() => {
        if (timeSelection.relativeTime) {
            setQueryParams({
                [TIME_QUERY]: MAP_TIME_TO_FILTER_QUERY[timeSelection.relativeTime],
                [START_TIME_QUERY]: undefined,
                [END_TIME_QUERY]: undefined,
            });
        } else if (timeSelection.customTime) {
            setQueryParams({
                [TIME_QUERY]: undefined,
                [START_TIME_QUERY]: timeSelection.customTime?.startTime?.toISOString(),
                [END_TIME_QUERY]: timeSelection.customTime?.endTime?.toISOString(),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setQueryParams, timeSelection]);

    useEffect(() => {
        if (location.pathname === PAGES.profiles.to || location.pathname === PAGES.comparison.to) {
            handleTimeChange();
        }
    }, [timeSelection, handleTimeChange, location.pathname]);

    useEffect(() => {
        if (time || (startTime && endTime)) {
            if (!time && isValidDate(new Date(startTime)) && isValidDate(new Date(endTime))) {
                setTimeSelection({ customTime: { startTime: new Date(startTime), endTime: new Date(endTime) } });
            } else if (isDateQueryParamsExists(time)) {
                setTimeSelection({ relativeTime: MAP_FILTER_QUERY_TO_TIME[time] });
            } else {
                setTimeSelection({ relativeTime: DEFAULT_INITIAL_TIME_RANGE_FILTER });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useTimePickQueryParams;
