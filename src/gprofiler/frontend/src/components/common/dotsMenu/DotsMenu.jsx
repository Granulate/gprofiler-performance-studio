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
