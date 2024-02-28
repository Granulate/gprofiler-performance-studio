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

import { ECS_DESCRIPTION_TITLE, K8S_DESCRIPTION_TITLE } from '../../../utils/filtersUtils';

const ContainerEnvNameDescription = () => {
    return (
        <>
            <Box>
                <Typography variant='body3_lato' sx={{ fontWeight: 'bold' }}>
                    {K8S_DESCRIPTION_TITLE}
                </Typography>
                <Typography variant='body3_lato'>
                    {' '}
                    - tuple of "pod name", "namespace" separated by _ from which profiles were collected. For a pod
                    controlled by a deployment named "app" in the namespace "default", we'd get "app_default".
                </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography variant='body3_lato' sx={{ fontWeight: 'bold' }}>
                    {ECS_DESCRIPTION_TITLE}
                </Typography>
                <Typography variant='body3_lato'>
                    {' '}
                    - the "task family". For a task family named "tracker", we'd get "tracker".
                </Typography>
            </Box>
        </>
    );
};

export default ContainerEnvNameDescription;
