{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { COLORS } from '../../../theme/colors';
import { calcDiffInPercentage } from '../../../utils/mergeUtils';
import Icon from '../../common/icon/Icon';
import { ICONS_NAMES } from '../../common/icon/iconsData';

export const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        padding: '9px',
        backgroundColor: COLORS.FIELD_BLUE_B,
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: 'Poppins !important',
    },
    [`&.${tableCellClasses.body}`]: {
        padding: '9px',
        fontSize: '14px',
        fontWeight: 400,
        fontFamily: 'Lato',
    },
}));

export const StyledTableFirstCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.body}`]: {
        padding: '9px',
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: 'Poppins',
    },
}));

export const StyledTableRow = styled(TableRow)(() => ({
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const ColoredSpan = ({ text }) => (
    <span
        style={{
            background: COLORS.FIELD_BLUE_A,
            boxShadow: `.3em 0 0 ${COLORS.FIELD_BLUE_A}, -.3em 0 0 ${COLORS.FIELD_BLUE_A}`,
        }}>
        {text}
    </span>
);

export const DiffTableLine = ({ value1, value2, title = '' }) => {
    const diff = calcDiffInPercentage(value1, value2);
    const diffLarger = diff > 0 ? true : false;
    return (
        <Box sx={{ display: 'flex' }}>
            {diff ? (
                <>
                    {Math.abs(diff).toFixed(1) + '%'}
                    <Icon
                        name={ICONS_NAMES.ArrowDown}
                        flip={diffLarger}
                        color={diffLarger ? COLORS.SUCCESS_GREEN : COLORS.ERROR_RED}
                    />
                    {title}
                </>
            ) : (
                '--'
            )}
        </Box>
    );
};
