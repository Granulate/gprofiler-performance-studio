

import Typography from '@mui/material/Typography';

import { CardIconStartProfiling } from '../../../svg';
import { PAGES } from '../../../utils/consts';
import Button from '../../common/button/Button';
import Card from '../../common/dataDisplay/card/Card';
import Flexbox from '../../common/layout/Flexbox';

const StartProfillingCard = () => {
    return (
        <Card
            sxOverrides={{
                backgroundColor: 'primary.main',
                color: 'white.main',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '600px',
                margin: 'auto',
            }}>
            <Flexbox justifyContent='center'>
                <CardIconStartProfiling />
            </Flexbox>
            <Typography variant='h3' sx={{ mt: 5, color: 'white.main' }}>
                Start Profiling
            </Typography>
            <Flexbox sx={{ height: '100%' }}>
                <Typography variant='body1' sx={{ mt: 5 }}>
                    Deploy gProfiler on your service of choice and start profiling today!
                </Typography>
            </Flexbox>
            <Flexbox justifyContent='flex-start' sx={{ marginTop: 7 }}>
                <Button size='large' variant='outlined' to={PAGES.installation.to}>
                    Get started
                </Button>
            </Flexbox>
        </Card>
    );
};

export default StartProfillingCard;
