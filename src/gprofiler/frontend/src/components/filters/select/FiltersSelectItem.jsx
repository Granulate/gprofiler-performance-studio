{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
