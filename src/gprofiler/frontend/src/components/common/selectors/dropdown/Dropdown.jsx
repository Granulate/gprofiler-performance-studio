{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Button, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import { useState } from 'react';

import Icon from '../../icon/Icon';
import { ICONS_NAMES } from '../../icon/iconsData';

export default function Dropdown({
    icon = undefined,
    title = 'no title',
    children,
    customHeight = undefined,
    customWidth = undefined,
    open = false,
    setOpen = undefined,
    disabled,
    fullWidth = false,
    buttonMaxWidth = undefined,
    placement = 'bottom-start',
    hideArrow = false,
    disablePortal = false,
    onRightClick = undefined,
}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [localIsOpen, setLocalIsOpen] = useState(false);
    const isStateHandledOutside = !!setOpen;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        if (isStateHandledOutside) {
            setOpen((previousOpen) => !previousOpen);
        } else {
            setLocalIsOpen((previousOpen) => !previousOpen);
        }
    };
    const handleClose = () => {
        if (isStateHandledOutside) {
            setOpen(false);
        } else {
            setLocalIsOpen(false);
        }
    };

    // this is for the popper to have an id based on if an enchor element exist.
    // if it does then a dropdown can be opened and the id is set. it is also for the popper portal management.
    const canBeOpen = open && Boolean(anchorEl);
    const popperId = canBeOpen ? 'transition-popper' : undefined;

    return (
        <Box
            sx={{
                width: buttonMaxWidth ? buttonMaxWidth : null,
                position: 'relative',
                flexGrow: 1,
            }}>
            <DropDownButton
                open={open}
                disabled={disabled}
                handleClick={handleClick}
                hideArrow={hideArrow}
                buttonMaxWidth={buttonMaxWidth}
                icon={icon}
                title={title}
                onRightClick={onRightClick}
            />

            <Popper
                id={popperId}
                open={isStateHandledOutside ? open : localIsOpen}
                anchorEl={anchorEl}
                transition
                disablePortal={fullWidth || disablePortal}
                placement={placement}
                style={{ width: fullWidth ? '100%' : customWidth || '360px', zIndex: 99 }}>
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Fade {...TransitionProps} timeout={350}>
                            <Box
                                sx={{
                                    borderRadius: 1,
                                    bgcolor: 'background.paper',
                                    boxShadow:
                                        '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)',
                                    mt: 1,
                                    height: customHeight,
                                }}>
                                {children}
                            </Box>
                        </Fade>
                    </ClickAwayListener>
                )}
            </Popper>
        </Box>
    );
}

export const DropDownButton = ({
    open,
    disabled = false,
    handleClick,
    hideArrow = false,
    buttonMaxWidth = undefined,
    icon = undefined,
    onRightClick,
    title,
}) => {
    return (
        <Button
            variant='outlined'
            disabled={disabled}
            onClick={handleClick}
            fullWidth
            onContextMenu={onRightClick}
            endIcon={
                hideArrow ? undefined : (
                    <Icon name={ICONS_NAMES.ChevronLeft} rotate={open ? 90 : -90} color='rgba(0, 0, 0, 0.25)' />
                )
            }
            sx={{
                height: '41px',
                minWidth: 43,
                borderRadius: 1,
                justifyContent: 'space-between',
                maxWidth: buttonMaxWidth || 'inherit',
            }}>
            <Stack direction='row' alignItems='center' spacing={3} sx={{ overflow: 'hidden' }}>
                {icon}
                {typeof title === 'string' ? (
                    <Typography
                        variant='body2_lato'
                        sx={{
                            textAlign: 'left',
                            fontWeight: 400,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}>
                        {title}
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}>
                        {title}
                    </Box>
                )}
            </Stack>
        </Button>
    );
};
