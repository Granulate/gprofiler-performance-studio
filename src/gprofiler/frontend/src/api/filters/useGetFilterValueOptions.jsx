

import { useContext } from 'react';

import { SelectorsContext } from '../../states';
import { FILTER_TYPES } from '../../utils/filtersUtils';
import { DATA_URLS } from '../urls';
import useFetchWithRequest from '../useFetchWithRequest';
import { getStartEndDateTimeFromSelection } from '../utils';

const useGetFilterValueOptions = () => {
    const { selectedService, timeSelection } = useContext(SelectorsContext);
    const params = { ...getStartEndDateTimeFromSelection(timeSelection), serviceName: selectedService };

    const {
        data: containerEnvOptions,
        loading: containerEnvLoading,
        error: containerEnvError,
    } = useFetchWithRequest(
        {
            url: DATA_URLS.GET_FILTER_OPTIONS_VALUE(FILTER_TYPES.ContainerEnvName.value, params),
        },
        { refreshDeps: [selectedService, timeSelection] }
    );

    const {
        data: containerOptions,
        loading: containerOptionsLoading,
        error: containerOptionsError,
    } = useFetchWithRequest(
        {
            url: DATA_URLS.GET_FILTER_OPTIONS_VALUE(FILTER_TYPES.ContainerName.value, params),
        },
        { refreshDeps: [selectedService, timeSelection] }
    );

    const {
        data: hostNameOptions,
        loading: hostNameOptionsLoading,
        error: hostNameOptionsError,
    } = useFetchWithRequest(
        {
            url: DATA_URLS.GET_FILTER_OPTIONS_VALUE(FILTER_TYPES.HostName.value, params),
        },
        { refreshDeps: [selectedService, timeSelection] }
    );

    return {
        valueOptions: {
            [FILTER_TYPES.ContainerEnvName.value]: containerEnvOptions || [],
            [FILTER_TYPES.ContainerName.value]: containerOptions || [],
            [FILTER_TYPES.HostName.value]: hostNameOptions || [],
        },
        containerEnvOptions,
        containerEnvError,
        containerOptions,
        containerOptionsError,
        hostNameOptions,
        hostNameOptionsError,
        valueOptionsLoading: {
            [FILTER_TYPES.ContainerEnvName.value]: containerEnvLoading,
            [FILTER_TYPES.ContainerName.value]: containerOptionsLoading,
            [FILTER_TYPES.HostName.value]: hostNameOptionsLoading,
        },
    };
};

export default useGetFilterValueOptions;
