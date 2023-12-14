{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { MenuItem, MenuList, Paper, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

import Dropdown from '../dropdown/Dropdown';

const Select = ({
    placeholder = 'title missing',
    icon = undefined,
    onSelect,
    options,
    disabled,
    selectedOption,
    fullWidth = false,
}) => {
    const [open, setOpen] = useState(false);

    const handleClick = useCallback(
        (option) => {
            onSelect(option);
            setOpen(false);
        },
        [onSelect, setOpen]
    );

    return (
        <Dropdown
            disablePortal={fullWidth}
            fullWidth={fullWidth}
            title={selectedOption || placeholder}
            icon={icon}
            disabled={disabled}
            open={open}
            setOpen={setOpen}>
            <Paper>
                <MenuList>
                    {options?.map((option) => (
                        <MenuItem onClick={() => handleClick(option)} selected={option === selectedOption} key={option}>
                            <Typography variant='body1_lato' noWrap>
                                {option}
                            </Typography>
                        </MenuItem>
                    ))}
                </MenuList>
            </Paper>
        </Dropdown>
    );
};

export default Select;
