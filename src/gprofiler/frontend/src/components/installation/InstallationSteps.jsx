

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
