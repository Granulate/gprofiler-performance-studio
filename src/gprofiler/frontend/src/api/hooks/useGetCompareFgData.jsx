

import _ from 'lodash';
import { stringify } from 'query-string';

import { DATA_URLS } from '../urls';
import useFetchWithRequest from '../useFetchWithRequest';
import { getStartEndDateTimeFromSelection } from '../utils';

const areParamsDefined = (selectedService, timeSelection) => {
    return !_.isUndefined(selectedService) && !_.isUndefined(timeSelection);
};

const useGetCompareFgData = ({ timeSelection, service, setAbsoluteCompareTime }) => {
    const fgParams = {
        serviceName: service,
        enrichment: ['lang'],
    };
    const timeParams = getStartEndDateTimeFromSelection(timeSelection);
    const { data, loading, error } = useFetchWithRequest(
        {
            url: `${DATA_URLS.GET_FLAMEGRAPH}?${stringify(_.assign({ ...timeParams }, fgParams))}`,
        },
        {
            refreshDeps: [service, timeSelection],
            ready: areParamsDefined(service, timeSelection),
            onSuccess: () => {
                setAbsoluteCompareTime({ cStartTime: timeParams.startTime, cEndTime: timeParams.endTime });
            },
        }
    );

    return { compareData: data, isCompareLoading: loading, error };
};

export default useGetCompareFgData;
