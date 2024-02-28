

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
