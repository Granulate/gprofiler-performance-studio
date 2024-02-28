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

import noServicesSvg from '../../img/noServices.svg';
import Button from '../common/button/Button';
import Flexbox from '../common/layout/Flexbox';

const NoServices = () => {
    return (
        <Flexbox column justifyContent='center' alignItems='center' sx={{ textAlign: 'center' }}>
            <Typography
                variant='h1_lato'
                sx={{
                    mt: 8,
                    fontSize: '32px',
                    fontWeight: 700,
                    color: 'hoverGrey.main',
                }}>
                No services installed yet
            </Typography>
            <Typography
                variant='h2_lato'
                sx={{
                    maxWidth: 430,
                    my: 10,
                    color: 'hoverGrey.main',
                }}>
                Install the gProfiler agent on your service of choice and start profiling and optimizing your
                application.
            </Typography>
            <Box>
                <img src={noServicesSvg} alt='No Services Installed' />
            </Box>
            <Button size='large' to={`/installation`}>
                Install Service
            </Button>
        </Flexbox>
    );
};

export default NoServices;
