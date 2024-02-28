{/*
 * Copyright (C) 2023 Intel Corporation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
