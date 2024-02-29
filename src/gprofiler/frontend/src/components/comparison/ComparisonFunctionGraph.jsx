{
    /*
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
     */
}

import { Box, Grow, Typography } from '@mui/material';
import _ from 'lodash';
import { useCallback } from 'react';

import useGetTableFunctionCpuData from '../../api/hooks/useGetTableFunctionCpuData';
import Flexbox from '../common/layout/Flexbox';
import ClosePanelButton from '../profiles/header/metricsPanel/ClosePanelButton';
import FunctionCpuGraph from '../profiles/views/service/graphs/FunctionCpuGraph';

const ComparisonFunctionGraph = ({ functionName, setFunctionName, compareService, compareTimeSelection }) => {
    const { functionCpuData, functionCpuLoading } = useGetTableFunctionCpuData({
        functionName,
    });
    const handleClose = useCallback(() => setFunctionName(''), [setFunctionName]);

    const { functionCpuData: compareFunctionCpuData, functionCpuLoading: compareFunctionCpuLoading } =
        useGetTableFunctionCpuData({
            functionName,
            customService: compareService,
            customTimeSelection: compareTimeSelection,
        });

    return functionName ? (
        <Grow in>
            <Box sx={{ overflow: 'hidden' }}>
                <Flexbox
                    column
                    sx={{ width: '100%', p: 4, height: '220px', position: 'relative' }}
                    justifyContent='center'
                    alignItems='center'>
                    <Typography variant='body1_lato' sx={{ pt: 7, width: '100%', textAlign: 'center' }}>
                        {functionName}
                    </Typography>

                    <FunctionCpuGraph
                        functionCpuData={functionCpuData}
                        functionCpuLoading={functionCpuLoading}
                        compareTimeSelection={compareTimeSelection}
                        compareFunctionCpuData={compareFunctionCpuData}
                        compareFunctionCpuLoading={compareFunctionCpuLoading}
                    />
                    <ClosePanelButton handlePanelShowState={handleClose} />
                </Flexbox>
            </Box>
        </Grow>
    ) : null;
};

export default ComparisonFunctionGraph;
