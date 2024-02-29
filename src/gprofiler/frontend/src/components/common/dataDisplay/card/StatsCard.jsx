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

import { Typography } from '@mui/material';

import { ReactComponent as OptimizationBig } from '@/svg/optimization-big.svg';

import Flexbox from '../../layout/Flexbox';

const StatsCard = () => {
    return (
        <Flexbox column spacing={4}>
            <Flexbox alignItems='center' spacing={5}>
                <OptimizationBig />
                <Typography variant='italic' sx={{ color: 'grey.main', fontWeight: 600, whiteSpace: 'pre-line' }}>
                    Take your optimization efforts to the next level
                </Typography>
            </Flexbox>
            <Typography sx={{ pl: 12, whiteSpace: 'pre-line' }} variant='body1'>
                Let us do the heavy lifting. Our platform automatically identifies and performs improvements to resource
                management, boosting your app’s performance and reducing its costs.
            </Typography>
        </Flexbox>
    );
};

export default StatsCard;
