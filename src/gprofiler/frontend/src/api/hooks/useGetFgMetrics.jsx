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
import { PROFILES_VIEWS } from '../../utils/consts';
import { DATA_URLS } from '../urls';
import useFetchWithRequest from '../useFetchWithRequest';
import { getStartEndDateTimeFromSelection } from '../utils';

const areParamsDefined = (selectedService, timeSelection) => {
    return !_.isUndefined(selectedService) && !_.isUndefined(timeSelection);
};

const useGetFgMetrics = ({ customTimeSelection, customService, disableCoreNodesRequest = false }) => {
    const { selectedService, timeSelection, viewMode, ignoreZeros } = useContext(SelectorsContext);
    const { activeFilterTag } = useContext(FilterTagsContext);
    const [metricsData, setMetricsData] = useState(undefined);
    const [coresNodesCountData, setCoresNodesCountData] = useState(undefined);
    const [instanceTypeData, setInstanceTypeData] = useState(undefined);
    const timeParams = getStartEndDateTimeFromSelection(customTimeSelection || timeSelection);

    const metricsParams = {
        serviceName: customService || selectedService,
        filter: activeFilterTag?.filter ? JSON.stringify(activeFilterTag) : undefined,
        ...timeParams,
    };

    const { loading: metricsLoading } = useFetchWithRequest(
        {
            url: DATA_URLS.GET_METRICS + '?' + stringify(metricsParams),
        },
        {
            refreshDeps: [
                customService,
                selectedService,
                customTimeSelection ? customTimeSelection : timeSelection,
                activeFilterTag,
            ],
            ready: areParamsDefined(customService || selectedService, customTimeSelection || timeSelection),
            onSuccess: (result) => {
                setMetricsData(result);
            },
            onError: () => {
                setMetricsData(undefined);
            },
        }
    );

    const isServiceView = viewMode === PROFILES_VIEWS.service;
    const serviceAndTimeParams = {
        serviceName: customService || selectedService,
        ignoreZeros: ignoreZeros,
        ...timeParams,
        ...(!isServiceView ? { filter: activeFilterTag?.filter ? JSON.stringify(activeFilterTag) : undefined } : {}),
    };

    const { loading: coresNodesCountLoading } = useFetchWithRequest(
        {
            url: DATA_URLS.GET_NODES_AND_CORES + '?' + stringify(serviceAndTimeParams),
        },
        {
            refreshDeps: [
                customService,
                selectedService,
                customTimeSelection ? customTimeSelection : timeSelection,
                viewMode,
                activeFilterTag,
                ignoreZeros,
            ],
            ready:
                !disableCoreNodesRequest &&
                areParamsDefined(customService || selectedService, customTimeSelection || timeSelection),
            onSuccess: (result) => {
                setCoresNodesCountData(result);
            },
            onError: () => {
                setCoresNodesCountData(undefined);
            },
        }
    );

    const { loading: instanceTypeDataLoading } = useFetchWithRequest(
        {
            url: DATA_URLS.GET_INSTANCE_TYPE + '?' + stringify(serviceAndTimeParams),
        },
        {
            refreshDeps: [selectedService, customService, customTimeSelection ? customTimeSelection : timeSelection],
            ready: areParamsDefined(customService || selectedService, customTimeSelection || timeSelection),
            onSuccess: (result) => {
                setInstanceTypeData(result);
            },
            onError: () => {
                setInstanceTypeData(undefined);
            },
        }
    );
    return {
        metricsData,
        metricsLoading,
        coresNodesCountData: coresNodesCountData,
        coresNodesCountLoading,
        instanceTypeData,
        instanceTypeDataLoading,
    };
};

export default useGetFgMetrics;
