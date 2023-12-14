{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StringParam, useQueryParams } from 'use-query-params';

import { PAGES } from '../utils/consts';
import { FILTER_EQUALNESS, FILTER_OPERATIONS, FILTER_TYPES } from '../utils/filtersUtils';

const mapFilterToQueryParam = {
    [FILTER_TYPES.ContainerName.value]: 'cn',
    [FILTER_TYPES.HostName.value]: 'hn',
    [FILTER_TYPES.ContainerEnvName.value]: 'cen',
};

const mapQueryParamToFilter = {
    cn: [FILTER_TYPES.ContainerName.value],
    hn: [FILTER_TYPES.HostName.value],
    cen: [FILTER_TYPES.ContainerEnvName.value],
};

const mapOperatorToQueryParam = {
    [FILTER_OPERATIONS.$and.value]: 'a',
    [FILTER_OPERATIONS.$or.value]: 'o',
};

const mapEqualToQueryParam = {
    [FILTER_EQUALNESS.$eq.value]: 'is',
    [FILTER_EQUALNESS.$neq.value]: 'not',
};
const mapQueryParamToEqual = {
    is: [FILTER_EQUALNESS.$eq.value],
    not: [FILTER_EQUALNESS.$neq.value],
};

const delimiter = ',';

const parseFilterToQueryParam = (filter) => {
    const [operation, rules] = Object.entries(filter.filter)[0];

    return rules
        .map((rule) => {
            const [type, subItem] = Object.entries(rule)[0];
            const [equal, value] = Object.entries(subItem)[0];
            return mapFilterToQueryParam[type] + delimiter + mapEqualToQueryParam[equal] + delimiter + value;
        })
        .join(delimiter + mapOperatorToQueryParam[operation] + delimiter);
};

const AND_IDENIFIER = `${delimiter}a${delimiter}`;

const parseQueryParamsToFilter = (filter) => {
    const splittedFilter = filter.split(/,o,|,a,/);
    const operator = filter.includes(AND_IDENIFIER) ? FILTER_OPERATIONS.$and.value : FILTER_OPERATIONS.$or.value;
    const rules = [];
    splittedFilter.forEach((rule) => {
        const parsedRule = splitAndAppend(rule, delimiter, 2);
        rules.push({
            type: mapQueryParamToFilter[parsedRule[0]],
            equal: mapQueryParamToEqual[parsedRule[1]],
            value: parsedRule[2],
        });
    });
    return {
        [operator]: rules.map((rule) => {
            return { [rule.type]: { [rule.equal]: rule.value } };
        }),
    };
};

const splitAndAppend = (str, delim, count) => {
    const arr = str.split(delim);
    return [...arr.splice(0, count), arr.join(delim)];
};

const useMainFiltersQueryParams = ({ activeFilterTag, setActiveFilterTag }) => {
    let location = useLocation();
    const [queryParams, setQueryParams] = useQueryParams({
        filter: StringParam,
    });
    const { filter } = queryParams;

    const handleFilterChange = useCallback(() => {
        //set query params by filters

        setQueryParams({
            filter: activeFilterTag ? parseFilterToQueryParam(activeFilterTag) : undefined,
        });
    }, [setQueryParams, activeFilterTag]);

    useEffect(() => {
        if (location.pathname === PAGES.profiles.to) {
            handleFilterChange();
        }
    }, [activeFilterTag, handleFilterChange, location.pathname]);

    useEffect(() => {
        //set filters by query params if they exist

        if (filter) {
            const parsedFilter = parseQueryParamsToFilter(filter);
            setTimeout(() => {
                setActiveFilterTag({ id: '', filter: parsedFilter });
            }, 3000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetActiveTagFiltersQuery = () => {
        setQueryParams({ filter: undefined });
    };
    return { resetActiveTagFiltersQuery };
};

export default useMainFiltersQueryParams;
