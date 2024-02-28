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



import { Divider, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import _ from 'lodash';

import Tooltip from '../../../common/dataDisplay/muiToolTip/Tooltip';
import Flexbox from '../../../common/layout/Flexbox';

export const PanelDivider = () => (
    <Divider orientation='vertical' sx={{ borderColor: 'grey.dark', opacity: 0.1 }} flexItem />
);

const InfoBox = ({ title, value, width, tooltip = '' }) => {
    return (
        <Tooltip key={title} content={tooltip} arrow variant='dark' placement='bottom'>
            <div>
                <Flexbox spacing={3} sx={{ py: 2 }} justifyContent='center' alignItems='center'>
                    <Typography variant='body4'>{title} </Typography>
                    <Typography variant='body4' color='primary' fontWeight={500}>
                        {_.isNil(value) ? <Skeleton variant='text' width={`${width}px`} animation='wave' /> : value}
                    </Typography>
                </Flexbox>
            </div>
        </Tooltip>
    );
};

export default InfoBox;
