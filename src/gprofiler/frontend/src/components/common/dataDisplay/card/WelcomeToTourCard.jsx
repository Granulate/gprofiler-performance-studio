{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, Typography } from '@mui/material';

import { TourIcon } from '@/svg';
import { COLORS } from '@/theme/colors';

import Button from '../../button/Button';
import Icon from '../../icon/Icon';
import { ICONS_NAMES } from '../../icon/iconsData';
import Flexbox from '../../layout/Flexbox';

const WelcomeToTourCard = ({ onClose = () => {}, onCtaClick = () => {} }) => {
    return (
        <Box sx={{ backgroundColor: COLORS.BLUE_9, p: 8, borderRadius: 2 }}>
            <Box sx={{ position: 'absolute', right: '10px', top: '5px' }}>
                <Button iconOnly color='inherit' onClick={onClose}>
                    <Icon
                        name={ICONS_NAMES.Close}
                        vertical
                        margin={5}
                        marginLeft={0}
                        marginRight={0}
                        color={'white'}
                        hoverColor={COLORS.BLUE}
                    />
                </Button>
            </Box>
            <Flexbox column sx={{ px: 6 }} color='white.main' alignItems='center'>
                <Typography>
                    <TourIcon width={117} height={66} />
                </Typography>
                <Typography
                    mt={5}
                    variant='h5'
                    sx={{
                        color: COLORS.GREY_VERY_LIGHT,
                    }}>
                    Installation Tour
                </Typography>
                <Typography
                    variant='body1'
                    sx={{
                        maxWidth: '60%',
                        textAlign: 'center',
                        color: 'secondary.main',
                        mt: 4,
                    }}>
                    Having trouble installing a service?
                    <br />
                    Let us walk you through the process.
                </Typography>
                <Button
                    sx={{ mt: 9, mb: 3 }}
                    size='large'
                    onClick={onCtaClick}
                    href='https://granulate.tourial.com/InstallationTour'>
                    Take the tour
                </Button>
            </Flexbox>
        </Box>
    );
};

WelcomeToTourCard.propTypes = {};

export default WelcomeToTourCard;