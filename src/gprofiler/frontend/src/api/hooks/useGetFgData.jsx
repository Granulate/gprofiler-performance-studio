

import _ from 'lodash';
import { stringify } from 'query-string';
import { useContext, useEffect } from 'react';

import { FgContext, SelectorsContext } from '../../states';
import { FilterTagsContext } from '../../states/filters/FiltersTagsContext';
import { PROFILES_VIEWS, STACKS_COUNT } from '../../utils/consts';
import { localDatetimeToUtc } from '../../utils/datetimesUtils';
import { TIME_RANGE_RELATIVE_DATE_METHOD } from '../../utils/fgUtils';
import { DATA_URLS } from '../urls';
import useFetchWithRequest from '../useFetchWithRequest';
import { getStartEndDateTimeFromSelection } from '../utils';

const areParamsDefined = (selectedService, timeSelection, activeFilterTags) => {
    return !_.isUndefined(selectedService) && !_.isUndefined(timeSelection) && !_.isUndefined(activeFilterTags);
};

const useGetFgData = ({ disableLastWeekFetch = false }) => {
    const { selectedService, timeSelection, viewMode, setTimeFetched, setAbsoluteTimeSelection } =
        useContext(SelectorsContext);
    const { activeFilterTag } = useContext(FilterTagsContext);
    const { viewTruncated } = useContext(FgContext);

    const fgParams = {
        serviceName: selectedService,
        enrichment: ['lang'],
        ...(viewTruncated && { stacksCount: STACKS_COUNT }),
        filter: JSON.stringify(activeFilterTag),
    };
    const timeParams = getStartEndDateTimeFromSelection(timeSelection);
    const { data, loading, error } = useFetchWithRequest(
        {
            url: `${DATA_URLS.GET_FLAMEGRAPH}?${stringify(_.assign({ ...timeParams }, fgParams))}`,
        },
        {
            refreshDeps: [selectedService, timeSelection, viewTruncated, JSON.stringify(activeFilterTag)],
            ready: areParamsDefined(selectedService, timeSelection, true),
            onSuccess: () => {
                setTimeFetched(new Date());
                setAbsoluteTimeSelection(timeParams);
            },
        }
    );

    const weeklyParams = {
        startTime: localDatetimeToUtc(TIME_RANGE_RELATIVE_DATE_METHOD.weekly()),
        endTime: localDatetimeToUtc(new Date()),
    };

    const {
        error: lastWeekDataError,
        loading: isLastWeekDataLoading,
        data: lastWeekData,
        run: lastWeekRun,
    } = useFetchWithRequest(
        {
            url: `${DATA_URLS.GET_FLAMEGRAPH}?${stringify(_.assign({ ...weeklyParams }, fgParams))}`,
        },
        { manual: true }
    );

    useEffect(() => {
        if (viewMode === PROFILES_VIEWS.table && !disableLastWeekFetch) {
            lastWeekRun();
        }
    }, [lastWeekRun, viewMode, activeFilterTag, selectedService, disableLastWeekFetch]);

    return {
        data,
        loading,
        error: error?.message,
        lastWeekDataError,
        isLastWeekDataLoading,
        lastWeekData,
    };
};

export default useGetFgData;
