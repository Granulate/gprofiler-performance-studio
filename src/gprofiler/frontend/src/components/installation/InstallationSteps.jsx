{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, List, Typography } from '@mui/material';

import { getApiKeyStep } from '@/utils/installationUtils';

import InstallationStep from './InstallationStep';

const InstallationSteps = ({ stepsData, title, description, apiKey }) => {
    return (
        <>
            <Typography variant='h1_lato' sx={{ fontWeight: 600 }}>
                {title}
            </Typography>
            <Box sx={{ whiteSpace: 'pre-line', marginY: 3 }}>
                <Typography variant='body1_lato'>{description}</Typography>
            </Box>
            <List sx={{ width: '100%' }} disablePadding>
                <InstallationStep index={0} step={getApiKeyStep(apiKey)} />
                {stepsData.map((step, index) => (
                    <InstallationStep key={index + 1} index={index + 1} step={step} />
                ))}
            </List>
        </>
    );
};

export default InstallationSteps;
