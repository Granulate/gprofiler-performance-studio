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

import { MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

import { ColorPalette } from '../../../theme/colors';
import Tooltip from '../../common/dataDisplay/muiToolTip/Tooltip';

const FiltersSelectItem = ({ value, label, description, ...props }) => {
    return (
        <Tooltip maxWidth={550} content={description} placement='left'>
            <MenuItem
                sx={{
                    typography: 'body1_lato',
                    '&:hover': {
                        backgroundColor: ColorPalette.fieldBlue.main,
                        color: ColorPalette.primary.main,
                    },
                }}
                value={value}
                {...props}>
                {label}
            </MenuItem>
        </Tooltip>
    );
};

FiltersSelectItem.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
};

export default FiltersSelectItem;
