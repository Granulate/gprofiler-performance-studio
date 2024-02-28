

import { Box, Link } from '@mui/material';

import Icon from '../../../components/common/icon/Icon';
import { ICONS_NAMES } from '../../../components/common/icon/iconsData';
import ECSInstallationGif from '../../../img/gprofiler-ecs-installation.gif';
import { COLORS } from '../../../theme/colors';
import Flexbox from '../../common/layout/Flexbox';

const ECSDeployStepTitle = () => {
    return (
        <Flexbox>
            Deploy gProfiler
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
                        alt='gProfiler ECS installation'
                        src={ECSInstallationGif}
                    />
                </Box>
            </Link>
        </Flexbox>
    );
};

export default ECSDeployStepTitle;
