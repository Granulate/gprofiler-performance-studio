{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import Box from '@mui/material/Box';

import Button from '@/components/common/button/Button';
import { SPECIAL_STACKS } from '@/utils/filtersUtils';

const ColoredCircle = ({ size = 30, color = 'black', active = true, background = '' }) => {
    return (
        <Box
            sx={{
                borderRadius: 45,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: active ? (background ? background : color) : 'transparent',
                ...(active && background ? { background } : {}),
                border: `2px solid ${background ? background : color}`,
                mr: 1,
            }}
        />
    );
};

const LegendButton = ({
    keyVar,
    background = '',
    color = '',
    active,
    onClick = () => {},
    label,
    size = 12,
    disabled = false,
}) => {
    return (
        <Button
            key={keyVar}
            size='small'
            noHover
            variant='text'
            onClick={onClick}
            sx={{ typography: 'body3_lato', mx: 1, my: 3, color: 'black.main' }}
            disabled={disabled}
            startIcon={<ColoredCircle size={size} color={color} active={active} background={background} />}>
            {disabled ? <Box sx={{ color: 'black.main' }}>{label}</Box> : label}
        </Button>
    );
};

const LegendButtons = ({ runtimeFilters, toggleRuntimeFilter, isRuntimeFilterActive, disabled }) => {
    return (
        <>
            {SPECIAL_STACKS.map((specialStack) => (
                <LegendButton
                    key={specialStack.name}
                    keyVar={specialStack.name}
                    active={true}
                    color={specialStack.color}
                    disabled={true}
                    label={specialStack.name}
                />
            ))}
            {runtimeFilters?.map((runtime) => (
                <LegendButton
                    key={runtime.name}
                    keyVar={runtime.name}
                    active={isRuntimeFilterActive(runtime.name)}
                    color={runtime.color}
                    onClick={() => {
                        toggleRuntimeFilter(runtime.name);
                    }}
                    label={runtime.name}
                    disabled={disabled}
                />
            ))}
        </>
    );
};
export default LegendButtons;
