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
