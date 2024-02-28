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
