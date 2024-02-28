

import { Typography } from '@mui/material';

import { ReactComponent as OptimizationBig } from '@/svg/optimization-big.svg';

import Flexbox from '../../layout/Flexbox';

const StatsCard = () => {
    return (
        <Flexbox column spacing={4}>
            <Flexbox alignItems='center' spacing={5}>
                <OptimizationBig />
                <Typography variant='italic' sx={{ color: 'grey.main', fontWeight: 600, whiteSpace: 'pre-line' }}>
                    Take your optimization efforts to the next level
                </Typography>
            </Flexbox>
            <Typography sx={{ pl: 12, whiteSpace: 'pre-line' }} variant='body1'>
                Let us do the heavy lifting. Our platform automatically identifies and performs improvements to resource
                management, boosting your app’s performance and reducing its costs.
            </Typography>
        </Flexbox>
    );
};

export default StatsCard;
