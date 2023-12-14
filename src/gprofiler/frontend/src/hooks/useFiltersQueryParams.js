{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrayParam, BooleanParam, NumberParam, StringParam, useQueryParams } from 'use-query-params';

import { PAGES } from '../utils/consts';
import { STACK_TYPES } from '../utils/filtersUtils';

const isThersholdDefined = (threshold) => {
    return _.isNumber(threshold);
};

const FilterToQueryParamsMapping = {
    [STACK_TYPES.Java]: 'ja',
    [STACK_TYPES.Python]: 'py',
    [STACK_TYPES.PHP]: 'ph',
    [STACK_TYPES.CPlus]: 'cp',
    [STACK_TYPES.DotNet]: 'dn',
    [STACK_TYPES.Kernel]: 'ke',
    [STACK_TYPES.Ruby]: 'rb',
    [STACK_TYPES.Node]: 'js',
    [STACK_TYPES.Go]: 'go',
    [STACK_TYPES.Other]: 'ot',
};
const QueryParamToFiltersMapping = {
    ja: STACK_TYPES.Java,
    py: STACK_TYPES.Python,
    ph: STACK_TYPES.PHP,
    cp: STACK_TYPES.CPlus,
    dn: STACK_TYPES.DotNet,
    ke: STACK_TYPES.Kernel,
    rb: STACK_TYPES.Ruby,
    js: STACK_TYPES.Node,
    go: STACK_TYPES.Go,
    ot: STACK_TYPES.Other,
};

const parseFiltersToQueryParams = (filters) => filters.map((filter) => FilterToQueryParamsMapping[filter]).join('_');

const parseQueryParamsToFilters = (queryRunTimeString) =>
    queryRunTimeString.split('_').map((filter) => QueryParamToFiltersMapping[filter]);

const getProccessListQueryParams = ({ processesList, filteredProccesses }) => {
    if (processesList.length !== filteredProccesses.length) {
        const listByInclude = filteredProccesses.length < processesList.length / 2;
        let parsedList = filteredProccesses;
        if (!listByInclude) {
            parsedList = processesList
                .filter((process) => filteredProccesses.indexOf(process.value) === -1)
                .map((process) => process.value);
        }
        //limit saving up to 40 processes
        return { processeList: parsedList.slice(0, 40), isProccesseListByInclusion: listByInclude };
    }
    return { processeList: undefined, isProccesseListByInclusion: undefined };
};

const useFiltersQueryParams = ({
    filters,
    setRuntimeFilters,
    setProcessesFilters,
    setWeightPercentile,
    setWeightThreshold,
    setIsMixedRuntimeStacksModeEnabled,
}) => {
    let location = useLocation();
    const [queryParams, setQueryParams] = useQueryParams({
        rt: StringParam,
        rtms: BooleanParam,
        p: ArrayParam,
        pm: BooleanParam,
        wt: NumberParam,
        wp: NumberParam,
    });
    const [isMounted, setMounted] = useState(false);
    const {
        rt: runtimeFilters,
        rtms: runTimeMixedStacks,
        p: processes,
        pm: isProccesseListByInclusion,
        wt: weightThreshold,
        wp: weightPercentile,
    } = queryParams;

    const handleFilterChange = useCallback(() => {
        const { runtime, processes, weight } = filters;
        if (processes.processesList?.length > 0) {
            const parsedProccessLogic = getProccessListQueryParams({
                processesList: processes.processesList,
                filteredProccesses: processes.filters,
            });
            setQueryParams({
                rt: runtime.filters?.length < 7 ? parseFiltersToQueryParams(runtime.filters) : undefined,
                rtms: runtime.isMixedRuntimeStacksModeEnabled || undefined,
                p: parsedProccessLogic.processeList,
                pm: parsedProccessLogic.isProccesseListByInclusion,
                wt: isThersholdDefined(weight.threshold) ? _.round(weight.threshold, 3) : undefined,
                wp: weight.percentile,
            });
        }
    }, [setQueryParams, filters]);

    useEffect(() => {
        if (location.pathname === PAGES.profiles.to) {
            handleFilterChange();
        }
    }, [filters, handleFilterChange, location.pathname]);

    useEffect(() => {
        if (!isMounted && filters.processes.processesList?.length > 0) {
            if (runtimeFilters) {
                setRuntimeFilters(parseQueryParamsToFilters(runtimeFilters));
            }
            if (runTimeMixedStacks && !filters.runtime.isMixedRuntimeStacksModeEnabled) {
                setIsMixedRuntimeStacksModeEnabled();
            }
            if (processes?.length > 0) {
                let proccessListValues = filters.processes.processesList.map((proccess) => proccess.value);
                let approvedFilters = [];
                if (isProccesseListByInclusion) {
                    approvedFilters = processes
                        //return only processes that are included
                        .filter((currentProccess) => proccessListValues.indexOf(currentProccess) > -1);
                } else {
                    approvedFilters = filters.processes.processesList
                        //return only processes that are NOT included
                        .filter((currentProccess) => processes.indexOf(currentProccess) === -1)
                        .map((filter) => filter.value);
                }
                setProcessesFilters(approvedFilters);
            }
            if (weightThreshold) {
                setWeightThreshold(weightThreshold);
            }
            if (weightPercentile) {
                setWeightPercentile(weightPercentile);
            }
            setMounted(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.processes.processesList]);
};

export default useFiltersQueryParams;
