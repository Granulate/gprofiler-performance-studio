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
