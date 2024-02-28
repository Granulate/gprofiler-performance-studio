

import { Box, Link, Typography } from '@mui/material';

import Icon from '../../../components/common/icon/Icon';
import { ICONS_NAMES } from '../../../components/common/icon/iconsData';
import EmrInstallationGif from '../../../img/gprofiler-emr-installation.gif';
import { COLORS } from '../../../theme/colors';
import Flexbox from '../../common/layout/Flexbox';

const EMRDeployStepTitle = () => {
    return (
        <Flexbox>
            <Box sx={{ mb: 3 }}>
                <Typography variant='h1_lato'>Deploy gProfiler</Typography>
            </Box>
            <Link
                sx={{
                    mt: '2px',
                    '&:hover .tutorial-illustration': {
                        display: 'block',
                    },
                    position: 'relative',
                }}>
                <Icon
                    name={ICONS_NAMES.Eye}
                    marginLeft={10}
                    color={COLORS.MAIN_GREY}
                    hoverColor={COLORS.PRIMARY_PURPLE}
                    vertical
                    size={22}
                />
                <Box
                    className='tutorial-illustration'
                    sx={{
                        display: 'none',
                        position: 'absolute',
                        bottom: '30px',
                        left: 0,
                    }}>
                    <img
                        width='100%'
                        style={{ width: 800, height: 'auto', margin: 'auto' }}
                        alt='gProfiler EMR installation'
                        src={EmrInstallationGif}
                    />
                </Box>
            </Link>
        </Flexbox>
    );
};

export default EMRDeployStepTitle;
