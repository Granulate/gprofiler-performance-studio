{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { List } from '@mui/material';
import PropTypes from 'prop-types';

import InstallationMenuButton from './InstallationMenuButton';

const InstallationMenu = ({ options, onClick, selectedKey, disabled }) => {
    return (
        <List dense sx={{ maxWidth: 220, minWidth: 180 }}>
            {options.map((option, index) => {
                const isSelected = selectedKey === option.key;
                return (
                    <InstallationMenuButton
                        key={index}
                        index={index}
                        method={option}
                        onClick={onClick}
                        selected={isSelected}
                        disabled={disabled}
                    />
                );
            })}
        </List>
    );
};

InstallationMenu.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.node,
        })
    ),
    onClick: PropTypes.func,
    selectedKey: PropTypes.string,
};

export default InstallationMenu;
