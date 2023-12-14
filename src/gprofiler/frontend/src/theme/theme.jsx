{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { createTheme } from '@mui/material/styles';

import { buttonStyles, iconButtonStyles } from './buttonStyles';
import { ColorPalette } from './colors';
import TypographyTheme from './typography';

const theme = createTheme({
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: { xs: 0, sm: 640, md: 832, lg: 1224, xl: 1500 },
    },
    space: [0, 2, 4, 8, 12, 16, 20, 24, 32, 36, 40, 48, 64, 128, 256, 512],
    spacing: [0, 2, 4, 8, 12, 16, 20, 24, 32, 36, 40, 48, 64, 128, 256, 512],
    palette: ColorPalette,
    zIndex: {
        backdrop: 100,
        modal: 120,
        floatingElements: 20,
        sidebar: 50,
        verification: 111,
    },
    borders: {
        separator: '1px solid rgba(97, 99, 112, 0.1);',
        activeText: '1px solid #3248FF',
        light: 'solid 1px #d9d9d9',
    },
    fonts: {
        body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Lato, "Helvetica Neue", sans-serif',
        heading: 'Lato, sans-serif',
        lato: 'Lato, sans-serif',
        poppins: 'Poppins, sans-serif',
        monospace: 'Menlo, monospace',
    },
    fontSizes: [12, 14, 16, 18, 20, 24, 30, 32, 48, 64, 96],
    typography: TypographyTheme,
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    border: 0,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: 24,
                },
            },
        },
        MuiChip: {
            variants: [
                {
                    props: { variant: 'eye' },
                    style: {
                        height: 'auto',
                        lineHeight: 'auto',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        backgroundColor: ColorPalette.primary.dark,
                        color: ColorPalette.white.main,
                        '&:hover': {
                            backgroundColor: ColorPalette.primary.main,
                        },
                        '&.Mui-disabled': {
                            backgroundColor: ColorPalette.grey.main,
                        },
                        '& .MuiChip-label': {
                            paddingTop: '4px',
                            paddingLeft: '4px',
                            paddingBottom: '4px',
                            lineHeight: '12px',
                        },
                        '& > svg': {
                            marginLeft: '6px',
                        },
                    },
                },
            ],
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    border: 'none',
                },
                previousNext: {
                    border: '1px solid rgba(0, 0, 0, 0.23) !important',
                },
            },
        },
        MuiButton: buttonStyles,
        MuiIconButton: iconButtonStyles,
        MuiClockPicker: {
            styleOverrides: {
                arrowSwitcher: {
                    '& + div': {
                        paddingBottom: '70px',
                    },
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    ...TypographyTheme.body1_lato,
                    color: 'black',
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '.MuiDataGrid-overlay': {
                        height: 'auto !important',
                        minHeight: '100px',
                    },
                },
            },
        },
    },
});

export default theme;
