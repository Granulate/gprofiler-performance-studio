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
