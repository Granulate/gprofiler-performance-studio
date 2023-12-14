{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import Menu from '@mui/material/Menu';
import _ from 'lodash';
import { useCallback, useState } from 'react';

import Button from '@/components/common/button/Button';
import Icon from '@/components/common/icon/Icon';
import { ICONS_NAMES } from '@/components/common/icon/iconsData';
import { COLORS } from '@/theme/colors';

const DotsMenu = ({ children, customEnchorEl = undefined, setCustomEnchorEl = undefined, disabled = false }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(!_.isUndefined(customEnchorEl) ? customEnchorEl : anchorEl);

    const handleClick = useCallback(
        (event) => {
            setAnchorEl(event.currentTarget);
            setCustomEnchorEl?.(event.currentTarget);
        },
        [setAnchorEl, setCustomEnchorEl]
    );

    const handleClose = useCallback(() => {
        setAnchorEl(null);
        setCustomEnchorEl?.(null);
    }, [setAnchorEl, setCustomEnchorEl]);

    return (
        <>
            <Button
                iconOnly
                color='inherit'
                id='actions-menu'
                onClick={handleClick}
                disabled={disabled}
                sxOverrides={{ height: '42px', width: '42px', minWidth: '42px' }}>
                <Icon
                    name={ICONS_NAMES.DotsVertical}
                    color={disabled ? COLORS.GREY_2 : open ? COLORS.PRIMARY_PURPLE : COLORS.BLUE_3}
                    hoverColor={COLORS.PRIMARY_PURPLE}
                />
            </Button>
            <Menu
                anchorEl={!_.isUndefined(customEnchorEl) ? customEnchorEl : anchorEl}
                open={open}
                onClose={handleClose}>
                {children}
            </Menu>
        </>
    );
};

export default DotsMenu;
