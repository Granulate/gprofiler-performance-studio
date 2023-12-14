{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
