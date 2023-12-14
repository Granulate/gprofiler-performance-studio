{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, Typography } from '@mui/material';

const SelectWithTitle = ({ children, title }) => {
    return (
        <Box sx={{ width: '100%', textAlign: 'left' }}>
            <Typography variant='body3_lato' sx={{ color: 'grey.dark' }}>
                {title}
            </Typography>
            {children}
        </Box>
    );
};
export default SelectWithTitle;
