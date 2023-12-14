{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import _ from 'lodash';

import { searchWithRegex } from '@/components/common/dataDisplay/table/useTableSearch';

import { isFunctionLegit, projectFgDataIntoTableView } from './fgUtils';

const createCompareTableData = (rootElement, isBaseData, parsedProcessesList) => {
    const currentData = Object.values(projectFgDataIntoTableView(rootElement.children, rootElement.value, false));
    const tableData = _.map(currentData, (functionElement) => {
        return {
            runtime: functionElement.runtime,
            function: functionElement.function,
            suffix: functionElement.suffix,
            [isBaseData ? 'samples' : 'samples2']: functionElement.samples,
            [isBaseData ? 'occurrencesNum' : 'occurrencesNum2']: functionElement.occurrences.length,
            [isBaseData ? 'totalTime' : 'totalTime2']: _.round((functionElement.samples / rootElement.value) * 100, 2),
            [isBaseData ? 'ownTime' : 'ownTime2']: _.round((functionElement.ownSamples / rootElement.value) * 100, 2),
        };
    });
    let FilteredTableData = tableData.filter((item) => isFunctionLegit(item.function, parsedProcessesList));
    FilteredTableData.forEach((item, i) => {
        item.id = i + 1;
    });
    return FilteredTableData;
};

const calcDiffInPercentage = (value1, value2) => (value1 && value2 ? _.round((value2 / value1) * 100, 2) - 100 : 0);

const mergeCompareData = (baseData, compareData) => {
    let mergedData = _.values(_.merge(_.keyBy(baseData, 'function'), _.keyBy(compareData, 'function')));
    mergedData.forEach((row, index) => {
        row.id = index + 1;
        row.totalCompare = calcDiffInPercentage(row.totalTime, row.totalTime2);
        row.ownCompare = calcDiffInPercentage(row.ownTime, row.ownTime2);
        row.occurrencesNumCompare = calcDiffInPercentage(row.occurrencesNum, row.occurrencesNum2);
    });
    return mergedData;
};

const searchFilteredData = (mergedData, searchValue) => {
    return searchWithRegex(searchValue, mergedData, (row) => row['function']);
};

export { calcDiffInPercentage, createCompareTableData, mergeCompareData, searchFilteredData };
