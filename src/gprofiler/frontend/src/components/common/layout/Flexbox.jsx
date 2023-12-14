{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

const Flexbox = ({ column = false, direction = undefined, children, sxOverrides = {}, ...props }) => {
    return (
        <Stack direction={direction ? direction : column ? 'column' : 'row'} {...props}>
            {children}
        </Stack>
    );
};

Flexbox.propTypes = {
    column: PropTypes.bool,
    className: PropTypes.string,
    alignItems: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    justifyContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
};

/** @component */
export default Flexbox;
