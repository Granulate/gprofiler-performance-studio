{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
