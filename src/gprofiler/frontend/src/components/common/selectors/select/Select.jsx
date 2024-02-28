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
