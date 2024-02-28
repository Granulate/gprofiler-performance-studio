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
