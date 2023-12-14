{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import _ from 'lodash';
import { stringify } from 'query-string';
import { useContext, useState } from 'react';

import { FilterTagsContext } from '../../states/filters/FiltersTagsContext';
import { SelectorsContext } from '../../states/selectors';
import { DATA_URLS } from '../urls';
import useFetchWithRequest from '../useFetchWithRequest';
import { getStartEndDateTimeFromSelection } from '../utils';

const areParamsDefined = (selectedService, timeSelection, functionName) => {
    return !_.isUndefined(selectedService) && !_.isUndefined(timeSelection) && !!functionName;
};

const useGetTableFunctionCpuData = ({ functionName, customService, customTimeSelection }) => {
    const { selectedService, timeSelection } = useContext(SelectorsContext);
    const { activeFilterTag } = useContext(FilterTagsContext);

    const [parsedData, setParsedData] = useState([]);
    const metricsParams = {
        serviceName: customService || selectedService,
        filter: activeFilterTag?.filter ? JSON.stringify(activeFilterTag) : undefined,
        functionName,
    };

    const timeParams = getStartEndDateTimeFromSelection(customTimeSelection || timeSelection);
    const { data: functionCpuData, loading: functionCpuLoading } = useFetchWithRequest(
        {
            url: DATA_URLS.GET_FUCNTION_CPU_GRAPH + '?' + stringify(_.assign({ ...timeParams }, metricsParams)),
        },
        {
            refreshDeps: [
                customService ? customService : selectedService,
                customTimeSelection ? customTimeSelection : timeSelection,
                functionName,
            ],
            ready: areParamsDefined(
                customService ? customService : selectedService,
                customTimeSelection ? customTimeSelection : timeSelection,
                functionName
            ),
            onBefore: () => setParsedData([]),
            onSuccess: (result) => {
                setParsedData(
                    result.map((cpuData) => {
                        return { cpu_percentage: cpuData.cpu_percentage * 100, time: cpuData.time };
                    })
                );
            },
        }
    );
    return {
        functionCpuData: parsedData,
        functionCpuLoading,
    };
};

export default useGetTableFunctionCpuData;
