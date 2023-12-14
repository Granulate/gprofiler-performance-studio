{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

const Error = ({ title, message }) => (
    <Box
        sx={{
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
        }}>
        <Alert severity='error'>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    </Box>
);

export default Error;
