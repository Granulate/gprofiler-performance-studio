{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import _ from 'lodash';
import { stringify } from 'query-string';
import { useContext } from 'react';

import { FilterTagsContext } from '../../states/filters/FiltersTagsContext';
import { SelectorsContext } from '../../states/selectors';
import { DATA_URLS } from '../urls';
import useFetchWithRequest from '../useFetchWithRequest';
import { getStartEndDateTimeFromSelection } from '../utils';

const areParamsDefined = (selectedService, timeSelection) => {
    return !_.isUndefined(selectedService) && !_.isUndefined(timeSelection);
};

const useGetServiceSamples = ({ resolution }) => {
    const { selectedService, timeSelection } = useContext(SelectorsContext);
    const { activeFilterTag } = useContext(FilterTagsContext);

    const metricsParams = {
        serviceName: selectedService,
        filter: activeFilterTag?.filter ? JSON.stringify(activeFilterTag) : undefined,
        requested_interval: resolution ? resolution.slice(0, -1) : undefined, //  in Clickhouse it is singular
    };

    const timeParams = getStartEndDateTimeFromSelection(timeSelection);
    const { data: samplesData, loading: samplesLoading } = useFetchWithRequest(
        {
            url: DATA_URLS.GET_SAMPLES + '?' + stringify(_.assign({ ...timeParams }, metricsParams)),
        },
        {
            refreshDeps: [selectedService, timeSelection, resolution],
            ready: areParamsDefined(selectedService, timeSelection),
        }
    );

    return {
        samplesData: samplesData,
        samplesLoading,
    };
};

export default useGetServiceSamples;
