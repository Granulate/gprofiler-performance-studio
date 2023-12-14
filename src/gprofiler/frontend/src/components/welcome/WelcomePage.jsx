{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
