{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import LoadingButton from '@mui/lab/LoadingButton';
import { forwardRef } from 'react';

import { COLORS } from '../../theme/colors';
import Button from '../common/button/Button';
import Tooltip from '../common/dataDisplay/muiToolTip/Tooltip';

export const FiltersButton = forwardRef(({ children, cta = false, sxOverride, ...props }, ref) => {
    return (
        <Button
            ref={ref}
            sx={{
                backgroundColor: cta ? 'primary.main' : 'fieldBlueB.main',
                height: 36,
                typography: 'body1_lato',
                fontWeight: cta ? 'bold' : 'inherit',
                borderRadius: '4px',
                '&:hover': {
                    backgroundColor: cta ? 'primary.dark' : 'fieldBlue.main',
                    boxShadow: 'none',
                },
                '&.Mui-disabled': {
                    backgroundColor: 'fieldBlueB.main',
                },
                color: cta ? 'white.main' : COLORS.SIDE_NAV_DARK,
                ...sxOverride,
            }}
            {...props}
            variant='contained'>
            {children}
        </Button>
    );
});
FiltersButton.displayName = 'FiltersButton';

export const FiltersIconButton = ({ children, sxOverride, tooltipText, ...props }) => {
    return (
        <Tooltip content={tooltipText} size='small'>
            <LoadingButton
                variant='contained'
                size='small'
                {...props}
                sx={{
                    backgroundColor: 'fieldBlueB.main',
                    borderRadius: '4px',
                    height: '36px',
                    '&:hover': { backgroundColor: 'fieldBlue.main', boxShadow: 'none' },
                    '&.Mui-disabled': {
                        backgroundColor: 'fieldBlueB.main',
                    },
                    ...sxOverride,
                }}>
                {children}
            </LoadingButton>
        </Tooltip>
    );
};
