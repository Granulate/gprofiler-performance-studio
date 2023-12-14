{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { COLORS } from './colors';

export const buttonStyles = {
    styleOverrides: {
        root: {
            borderRadius: '45px',
            boxShadow: 'none',
            color: COLORS.WHITE,
        },
        sizeSmall: {
            fontSize: '12px',
            padding: '1px 6px',
            minWidth: '40px',
            '& .MuiButton-startIcon': {
                marginRight: '3px',
            },
        },
        sizeMedium: {
            fontSize: '14px',
            padding: '3px 11px',
        },
        sizeLarge: {
            fontSize: '14px',
            padding: '5px 30px',
        },
        outlined: {
            background: COLORS.WHITE,
            color: COLORS.BLACK,
            border: `none`,
            '&:hover': {
                background: COLORS.WHITE,
                border: `none`,
            },
        },
        textInherit: {
            color: COLORS.BLACK,
        },
        textPrimary: {
            color: COLORS.PRIMARY_PURPLE,
        },
        textSecondary: {
            color: COLORS.WHITE,
        },
    },
};

export const iconButtonStyles = {
    styleOverrides: {
        colorPrimary: {
            background: COLORS.PRIMARY_PURPLE,
            '&:hover': {
                background: COLORS.DARK_PURPLE,
            },
            '&.Mui-disabled': {
                background: COLORS.PLAIN_GREY,
                opacity: 0.5,
            },
        },
        colorInherit: {
            background: 'none',
            '&:hover': {
                background: 'none',
            },
        },
    },
};
