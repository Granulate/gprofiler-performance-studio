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



import { Avatar, Box, Tooltip } from '@mui/material';
import _ from 'lodash';

import { COLORS } from '../../theme/colors';
import { getColorByRuntime } from '../../utils/filtersUtils';
import Icon from '../common/icon/Icon';
import { ICONS_NAMES } from '../common/icon/iconsData';
import Flexbox from '../common/layout/Flexbox';
import { RuntimeAvatarWithTooltip } from '../profiles/views/table/TableViewColumns';

const PercentageDiffrenceBox = ({ value }) => {
    const number = _.isNumber(value) ? value : 0;
    const diffLarger = number > 0 ? true : false;
    return (
        <Flexbox>
            {number ? (
                <>
                    <Icon
                        name={ICONS_NAMES.ArrowDown}
                        flip={diffLarger}
                        color={diffLarger ? COLORS.SUCCESS_GREEN : COLORS.ERROR_RED}
                    />
                    {Math.abs(number).toFixed(0) + '%'}
                </>
            ) : (
                '--'
            )}
        </Flexbox>
    );
};

export const comparisonTableColumns = (setFunctionName) => [
    {
        headerName: 'Runtime',
        description: 'The programing language of the function',
        field: 'runtime',
        align: 'center',
        headerAlign: 'center',
        width: 110,
        renderCell: (cell) => {
            const runtime = cell.value;
            const color = getColorByRuntime(runtime);
            return <RuntimeAvatarWithTooltip runtime={runtime} color={color} />;
        },
    },
    {
        headerName: 'Function name',
        description: 'The name of the function including library context',
        field: 'function',
        renderCell: (cell) => (
            <Box
                sx={{ cursor: 'pointer' }}
                title={cell.value}
                onClick={() => setFunctionName(cell.value + (cell.row.suffix || ''))}>
                {cell.value}
            </Box>
        ),
        flex: 1,
        minWidth: 350,
    },
    {
        headerName: 'samples',
        description:
            'The aggregated total number of samples of all the invocations of a given function. The sample count refers to total time including ancestry (functions called by the function)',
        field: 'samples',
        headerAlign: 'right',
        align: 'right',
        width: 100,
        renderCell: (cell) => cell.value || '--',
    },
    {
        field: 'samples2',
        headerName: '',
        renderCell: (cell) => cell.value || '--',
        cellClassName: 'compare-column',
        headerAlign: 'center',
        width: 100,
    },
    {
        headerName: 'Total CPU',
        description:
            'The total time the function was on-CPU or part of an ancestry (functions called by the function) that was on-CPU (based on sample count)',
        field: 'totalTime',
        width: 130,
        renderCell: (cell) => (cell.value ? `${cell.value}%` : '--'),
        type: 'number',
        headerAlign: 'right',
        align: 'right',
    },
    {
        headerName: '',
        field: 'totalTime2',
        cellClassName: 'compare-column',
        width: 70,
        renderCell: (cell) => (_.isNumber(cell.value) ? `${cell.value}%` : '--'),
        type: 'number',
        align: 'left',
        headerAlign: 'center',
    },
    {
        headerName: '',
        field: 'totalCompare',
        width: 85,
        align: 'left',
        headerAlign: 'center',
        type: 'number',
        renderCell: (cell) => {
            return <PercentageDiffrenceBox value={cell.value} />;
        },
    },
    {
        headerName: 'Own Time',
        description: 'The time the function was on-CPU, not including ancestry (functions called by the function)',
        field: 'ownTime',
        renderCell: (cell) => (_.isNumber(cell.value) ? `${cell.value}%` : '--'),
        type: 'number',
        width: 130,
        headerAlign: 'right',
        align: 'right',
    },
    {
        headerName: '',
        field: 'ownTime2',
        align: 'left',
        headerAlign: 'center',
        renderCell: (cell) => (_.isNumber(cell.value) ? `${cell.value}%` : '--'),
        type: 'number',
        cellClassName: 'compare-column',
        width: 70,
    },
    {
        headerName: '',
        field: 'ownCompare',
        type: 'number',
        align: 'left',
        headerAlign: 'center',
        width: 85,
        renderCell: (cell) => {
            return <PercentageDiffrenceBox value={cell.value} />;
        },
    },
    {
        headerName: 'Occurrences',
        description: 'The number of unique stacks that a given function appears in',
        renderCell: (cell) => (_.isNumber(cell.value) ? cell.value : '--'),
        field: 'occurrencesNum',
        type: 'number',
        width: 130,
    },
    {
        headerName: '',
        renderCell: (cell) => (_.isNumber(cell.value) ? cell.value : '--'),
        field: 'occurrencesNum2',
        align: 'left',
        headerAlign: 'center',
        type: 'number',
        cellClassName: 'compare-column',
        width: 130,
    },
    {
        headerName: '',
        field: 'occurrencesNumCompare',
        type: 'number',
        align: 'left',
        headerAlign: 'center',
        width: 85,
        renderCell: (cell) => {
            return <PercentageDiffrenceBox value={cell.value} />;
        },
    },
];
