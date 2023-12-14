{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box } from '@mui/material';
import _ from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { FgContext, FiltersContext, SearchContext } from '../../states';
import { createCompareTableData, mergeCompareData, searchFilteredData } from '../../utils/mergeUtils';
import MuiTable from '../common/dataDisplay/table/MuiTable';
import ErrorFallback from '../common/feedback/ErrorFallback';
import { comparisonTableColumns } from './ComparisonTableColumns';

const CompareTable = ({ compareFgData, isLoading, functionName, setFunctionName }) => {
    const { fgOriginData } = useContext(FgContext);

    const tableColumns = useMemo(() => comparisonTableColumns(setFunctionName), [setFunctionName]);

    const {
        filters: { processes: processesFilters },
    } = useContext(FiltersContext);

    const { searchValue } = useContext(SearchContext);

    const [justSearched, setJustSearched] = useState(!!searchValue);

    const parsedProcessesList = useMemo(() => {
        return processesFilters.processesList.map((item) => item.value);
    }, [processesFilters]);

    useEffect(() => {
        if (!searchValue && justSearched) {
            setJustSearched(true);
        } else if (!justSearched && !searchValue) {
            setJustSearched(false);
        } else if (searchValue) {
            setJustSearched(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    const mergedData = useMemo(() => {
        if (_.isUndefined(compareFgData) || compareFgData?.value === 0) {
            return createCompareTableData(fgOriginData, true, parsedProcessesList);
        } else if (_.isUndefined(compareFgData) || fgOriginData?.value === 0) {
            return createCompareTableData(compareFgData, false, parsedProcessesList);
        } else {
            return mergeCompareData(
                createCompareTableData(fgOriginData, true, parsedProcessesList),
                createCompareTableData(compareFgData, false, parsedProcessesList)
            );
        }
    }, [compareFgData, fgOriginData, parsedProcessesList]);

    const searchedData = useMemo(() => {
        if (searchValue) {
            return searchFilteredData(mergedData, searchValue);
        } else {
            return mergedData;
        }
    }, [mergedData, searchValue]);

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Box sx={{ p: 4 }}>
                <MuiTable data={searchedData} columns={tableColumns} isLoading={isLoading} />
            </Box>
        </ErrorBoundary>
    );
};

export default CompareTable;
