{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Avatar, Box } from '@mui/material';

import Flexbox from '@/components/common/layout/Flexbox';
import TrendInformation from '@/components/profiles/views/table/TrendInformation';
import { getColorByRuntime, getColorBySpecialType } from '@/utils/filtersUtils';

import Tooltip from '../../../common/dataDisplay/muiToolTip/Tooltip';
import FunctionNameColumn from './TableViewFunctionNameColumn';

export const PROFILES_TABLE_COLUMNS = (time, rowSelected) => [
    {
        headerName: 'Runtime',
        field: 'runtime',
        description: 'The programing language of the function',
        renderCell: (cell) => {
            const specialType = cell.row.specialType;
            const runtime = specialType || cell.value;
            const color = specialType ? getColorBySpecialType(specialType) : getColorByRuntime(runtime);
            return <RuntimeAvatarWithTooltip runtime={runtime} color={color} />;
        },
        width: 100,
        headerAlign: 'center',
    },
    {
        headerName: 'Function name',
        description: 'The name of the function including library context',
        field: 'function',
        flex: 1,
        minWidth: 200,
        renderCell: (cell) => (
            <FunctionNameColumn
                functionName={cell.value}
                coreFunctionName={cell.row.shortFunction}
                selected={rowSelected?.function === cell.value}
            />
        ),
    },
    {
        headerName: 'suffix',
        field: 'suffix',
    },
    {
        headerName: 'specialType',
        field: 'specialType',
    },
    {
        headerName: 'samples',
        field: 'samples',
        description:
            'The aggregated total number of samples of all the invocations of a given function. The sample count refers to total time including ancestry (functions called by the function)',
        type: 'number',
        width: 100,
        renderCell: (cell) => cell.value.toLocaleString(),
    },
    {
        headerName: 'Total CPU',
        description:
            'The total time the function was on-CPU or part of an ancestry (functions called by the function) that was on-CPU (based on sample count)',
        field: 'totalTime',
        type: 'number',
        width: 120,
        renderCell: (cell) => `${cell.value}%`,
    },
    {
        headerName: 'trend',
        description:
            'The presented total CPU is higher or lower compared to the function average CPU consumption over the past week. The trend is calculated based on total time including ancestry (functions called by the function)',
        field: 'trend',
        renderCell: (cell) => {
            const {
                lastWeekSamplesPercentage: lastConsumption,
                samplesPercentage: currentConsumption,
                trend: trendPercentage,
            } = cell.value;
            return (
                <TrendInformation
                    trendPercentage={trendPercentage}
                    lastConsumption={lastConsumption}
                    currentConsumption={currentConsumption}
                    time={time}
                    rowId={cell.row.id}
                />
            );
        },
        headerAlign: 'center',
        sortComparator: (a, b) => a.trend - b.trend,
    },
    {
        headerName: 'Own Time',
        description: 'The time the function was on-CPU, not including ancestry (functions called by the function)',
        field: 'ownTime',
        type: 'number',
        renderCell: (cell) => `${cell.value}%`,
    },
    {
        headerName: 'occurrences',
        description: 'The number of unique stacks that a given function appears in',
        field: 'occurrencesNum',
        type: 'number',
        width: 118,
        renderCell: (cell) => cell.value.toLocaleString(),
    },
];

export const RuntimeAvatarWithTooltip = ({ runtime, color }) => (
    <Tooltip content={runtime} variant='dark' size='small'>
        <Box sx={{ width: '100%' }}>
            <Flexbox justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
                <Avatar
                    sx={{
                        backgroundColor: `${color}`,
                        width: 10,
                        height: 10,
                    }}>
                    {''}
                </Avatar>
            </Flexbox>
        </Box>
    </Tooltip>
);