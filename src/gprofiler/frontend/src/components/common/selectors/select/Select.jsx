

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
