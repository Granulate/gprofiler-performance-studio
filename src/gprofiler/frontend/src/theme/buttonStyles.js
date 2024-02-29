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
