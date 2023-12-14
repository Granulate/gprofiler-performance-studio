{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, Typography } from '@mui/material';

import { ECS_DESCRIPTION_TITLE, K8S_DESCRIPTION_TITLE } from '../../../utils/filtersUtils';

const ContainerNameDescription = () => {
    return (
        <>
            <Box>
                <Typography variant='body3_lato' sx={{ fontWeight: 'bold' }}>
                    {K8S_DESCRIPTION_TITLE}
                </Typography>
                <Typography variant='body3_lato'>
                    {' '}
                    - tuple of "container name", "pod name", "namespace" separated by _ from which profiles were
                    collected. For a container named "nginx" which runs in a pod controlled by a deployment named "app"
                    in the namespace "default", we'd get 'nginx_app_default'.
                </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography variant='body3_lato' sx={{ fontWeight: 'bold' }}>
                    {ECS_DESCRIPTION_TITLE}
                </Typography>
                <Typography variant='body3_lato'>
                    {' '}
                    - tuple of "container name", "task family" separated by _. For a container named "worker" in a task
                    family named "tracker", we'd get "worker_tracker".
                </Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
                <Typography variant='body3_lato'>
                    For other environments - this is the container name as used by the container runtime, for example in
                    Docker it's the name given by "docker ps".
                </Typography>
            </Box>
        </>
    );
};

export default ContainerNameDescription;
