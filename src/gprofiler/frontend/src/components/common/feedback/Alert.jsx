{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, Typography } from '@mui/material';

import { COLORS } from '../../../theme/colors';
import { AlertIcon } from '../icon/Icons';
import Flexbox from '../layout/Flexbox';

const Alert = ({ type = 'error', noTitle = false, children }) => {
    let icon, styling, title;
    switch (type) {
        case 'warning':
            icon = <AlertIcon />;
            styling = {
                backgroundColor: COLORS.ALMOST_WHITE_1,
                color: COLORS.ORANGE_1,
                path: { fill: COLORS.ORANGE_1 },
            };
            title = 'Warning';
            break;
        case 'error':
        default:
            icon = <AlertIcon />;
            styling = {
                backgroundColor: COLORS.ALMOST_WHITE_2,
                color: COLORS.RED_1,
                path: { fill: COLORS.RED_1 },
            };
            title = 'Error';
            break;
    }
    return (
        <Flexbox
            justifyContent='center'
            sx={{
                borderRadius: 2,
                p: 4,
                ...styling,
            }}>
            <Flexbox>
                <Box sx={{ mt: '-2px' }}>{icon} </Box>
                {!noTitle && (
                    <Typography variant='body1_lato' sx={{ pl: 2, pt: 1, fontWeight: 600 }}>{`${title}:`}</Typography>
                )}
            </Flexbox>
            <Box sx={{ pl: 2 }}>
                <Typography variant='body1_lato'>{children}</Typography>
            </Box>
        </Flexbox>
    );
};

export default Alert;
