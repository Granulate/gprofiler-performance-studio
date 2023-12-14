{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Skeleton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import _ from 'lodash';
import { memo } from 'react';

import useGetFgMetrics from '../../../api/hooks/useGetFgMetrics';
import { parseCPUValue, parseMemoryValue } from '../../../utils/metricsUtils';
import {
    ColoredSpan,
    DiffTableLine,
    StyledTableCell,
    StyledTableFirstCell,
    StyledTableRow,
} from './comparisonMetricsTable.styles';

const columns = ['', 'Samples collected', 'CPU utilization', 'Memory utilization'];

const ComparisonMetricsTable = memo(
    ({ compareTimeSelection, baseSamples, compareSamples, compareService, isCompareDataLoading, isDataLoading }) => {
        const { metricsData, metricsLoading } = useGetFgMetrics({ disableCoreNodesRequest: true });

        const { metricsData: compareMetricsData, metricsLoading: compareMetricsLoading } = useGetFgMetrics({
            customTimeSelection: compareTimeSelection,
            customService: compareService,
            disableCoreNodesRequest: true,
        });

        const noMetrics = _.isEmpty(metricsData);
        const noCompareMetrics = _.isEmpty(compareMetricsData);
        const noBaseSamples = !_.isNumber(baseSamples);
        return (
            <TableContainer component={Paper} sx={{ maxWidth: '670px', borderRadius: 2 }} elevation={1}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((header) => (
                                <StyledTableCell key={header}>{header}</StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableFirstCell component='th' scope='row'>
                                Base
                            </StyledTableFirstCell>
                            <StyledTableCell>
                                {isDataLoading ? <Skeleton /> : noBaseSamples ? '--' : baseSamples}
                            </StyledTableCell>
                            <StyledTableCell>
                                {metricsLoading ? <Skeleton /> : noMetrics ? '--' : parseCPUValue(metricsData)}
                            </StyledTableCell>
                            <StyledTableCell>
                                {metricsLoading ? <Skeleton /> : noMetrics ? '--' : parseMemoryValue(metricsData)}
                            </StyledTableCell>
                        </StyledTableRow>

                        <StyledTableRow>
                            <StyledTableFirstCell component='th' scope='row'>
                                Compared
                            </StyledTableFirstCell>
                            <StyledTableCell>
                                {isCompareDataLoading ? (
                                    <Skeleton />
                                ) : compareSamples ? (
                                    <ColoredSpan text={compareSamples} />
                                ) : (
                                    '--'
                                )}
                            </StyledTableCell>
                            <StyledTableCell>
                                {compareMetricsLoading ? (
                                    <Skeleton />
                                ) : noCompareMetrics ? (
                                    '--'
                                ) : (
                                    <ColoredSpan text={parseCPUValue(compareMetricsData)} />
                                )}
                            </StyledTableCell>
                            <StyledTableCell>
                                {compareMetricsLoading ? (
                                    <Skeleton />
                                ) : noCompareMetrics ? (
                                    '--'
                                ) : (
                                    <ColoredSpan text={parseMemoryValue(compareMetricsData)} />
                                )}
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <StyledTableFirstCell component='th' scope='row'>
                                Difference
                            </StyledTableFirstCell>
                            <StyledTableCell>
                                <DiffTableLine value1={baseSamples} value2={compareSamples} />
                            </StyledTableCell>
                            <StyledTableCell>
                                <DiffTableLine
                                    value1={metricsData?.avg_cpu}
                                    value2={compareMetricsData?.avg_cpu}
                                    title='avg'
                                />
                                <DiffTableLine
                                    value1={metricsData?.max_cpu}
                                    value2={compareMetricsData?.max_cpu}
                                    title='max'
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <DiffTableLine
                                    value1={metricsData?.avg_memory}
                                    value2={compareMetricsData?.avg_memory}
                                    title='avg'
                                />
                                <DiffTableLine
                                    value1={metricsData?.max_memory}
                                    value2={compareMetricsData?.max_memory}
                                    title='max'
                                />
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
);
ComparisonMetricsTable.displayName = 'ComparisonMetricsTable';
export default ComparisonMetricsTable;