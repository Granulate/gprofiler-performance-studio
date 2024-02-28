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
