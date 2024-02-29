{
    /*
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
     */
}

import { Box, Grid, Typography } from '@mui/material';

import { Gprofiler3dLogo, GprofilerText } from '../../svg';
import { COLORS } from '../../theme/colors';
import { EXTERNAL_URLS } from '../../utils/consts';
import Button from '../common/button/Button';
import Icon from '../common/icon/Icon';
import { ICONS_NAMES } from '../common/icon/iconsData';
import Flexbox from '../common/layout/Flexbox';
import AccessPlaygroundCard from './cards/AccessPlaygroundCard';
import ProfillerVideoCard from './cards/ProfilerVideoCard';
import StartProfilingCard from './cards/StartProfilingCard';
import ProductTourIllustration from './ProductTourIllustration';

const WelcomePage = () => {
    return (
        <Flexbox
            column
            sx={{
                backgroundColor: 'white.main',
                flex: '1 1 auto',
            }}>
            <Flexbox
                sx={{
                    py: 12,
                    px: [4, 4, 4, 12],
                    maxWidth: '1800px',
                    flex: '1 1 auto',
                }}
                spacing={10}
                direction={{ xs: 'column', lg: 'row' }}
                alignItems='center'
                justifyContent={{ xs: 'center', lg: 'initial' }}>
                <Flexbox column>
                    <Flexbox column direction={{ xs: 'column', lg: 'row' }}>
                        <Flexbox justifyContent={{ xs: 'center', lg: 'initial' }}>
                            <Gprofiler3dLogo width={89} height={100} />
                        </Flexbox>
                        <Flexbox
                            column
                            justifyContent={{ xs: 'center', lg: 'initial' }}
                            alignItems={{ xs: 'center', lg: 'initial' }}
                            sx={{ pl: [0, 0, 0, 6] }}>
                            <Typography component='p' variant='h1'>
                                Welcome to the Granulate
                            </Typography>
                            <Typography
                                component='p'
                                variant='h1'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    '& svg': {
                                        position: 'relative',
                                        top: '1px',
                                    },
                                    '& span': {
                                        pl: 4,
                                    },
                                }}>
                                <GprofilerText width={180} height={40} /> <span>Platform</span>
                            </Typography>
                        </Flexbox>
                    </Flexbox>
                    <Flexbox justifyContent={{ xs: 'center', lg: 'initial' }} sx={{ mt: 2, maxWidth: '700px' }}>
                        <Typography variant='h3'>
                            Continuously identify, understand and improve the performance of your production code
                        </Typography>
                    </Flexbox>
                </Flexbox>
                <Flexbox>
                    <ProductTourIllustration />
                </Flexbox>
            </Flexbox>
            <Box sx={{ backgroundColor: COLORS.ALMOST_WHITE_4 }}>
                <Grid
                    container
                    spacing={8}
                    justifyContent='flex-start'
                    alignItems='stretch'
                    sx={{ mt: 6, px: 12, maxWidth: '1800px' }}>
                    <Grid item md={12} lg={4}>
                        <StartProfilingCard />
                    </Grid>

                    <Grid item md={12} lg={4}>
                        <AccessPlaygroundCard />
                    </Grid>

                    <Grid item md={12} lg={4}>
                        <ProfillerVideoCard />
                    </Grid>
                    <Grid item xs={12}>
                        <Flexbox justifyContent='flex-end' sx={{ mt: -5, mb: 4 }}>
                            <Button
                                href={EXTERNAL_URLS.documentation.to}
                                variant='text'
                                noHover
                                endIcon={
                                    <Icon name={ICONS_NAMES.ExternalLink} size={20} color={COLORS.PRIMARY_PURPLE} />
                                }>
                                <Typography variant='body1'>Learn more </Typography>
                            </Button>
                        </Flexbox>
                    </Grid>
                </Grid>
            </Box>
        </Flexbox>
    );
};

export default WelcomePage;
