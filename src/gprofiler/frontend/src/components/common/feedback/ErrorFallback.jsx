{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, Typography } from '@mui/material';

import ErrorIlustration from '../../../svg/error-page-view.svg';
import Button from '../button/Button';
import { RefreshIcon } from '../icon/Icons';
import Flexbox from '../layout/Flexbox';

const ErrorFallback = ({ error, onReset = null }) => {
    function refreshPage() {
        window.location.reload();
    }

    return (
        <Flexbox column justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
            <Flexbox column justifyContent='center' alignItems='center'>
                <img src={ErrorIlustration} alt='Error' style={{ width: '80%' }} />
                <Box sx={{ m: 5 }}>
                    <Typography>Oops, something failed…</Typography>
                    <br />
                    <Typography>Try refreshing the page</Typography>
                </Box>
                <Button onClick={refreshPage} startIcon={<RefreshIcon color='white' />}>
                    Refresh
                </Button>
                <Typography sx={{ mt: 5, textAlign: 'center' }}>
                    For more assistance contact us at: <a href='mailto:support@granulate.io'>support@granulate.io</a>
                </Typography>
            </Flexbox>
        </Flexbox>
    );
};

export default ErrorFallback;
