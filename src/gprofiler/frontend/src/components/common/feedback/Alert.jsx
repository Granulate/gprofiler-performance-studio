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
