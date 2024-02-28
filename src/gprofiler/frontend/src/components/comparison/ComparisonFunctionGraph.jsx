

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
