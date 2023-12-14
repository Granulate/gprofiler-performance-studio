{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
