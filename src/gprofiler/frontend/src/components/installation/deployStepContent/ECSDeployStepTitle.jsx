{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
