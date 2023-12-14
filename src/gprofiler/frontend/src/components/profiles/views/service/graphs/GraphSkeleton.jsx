{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Skeleton } from '@mui/material';
import _ from 'lodash';
import { memo } from 'react';

import Flexbox from '@/components/common/layout/Flexbox';

const getRandomHeight = () => Math.random() * (200 - 50) + 50;

// here we are generating skeletons with random height everytime.
const LineSkeleton = () => {
    const randomHeight = getRandomHeight();
    return <Skeleton key={randomHeight + ''} animation='wave' width='6%' height={`${randomHeight}px`} />;
};
const GraphSkeleton = memo(() => {
    return (
        <Flexbox justifyContent='space-between' alignItems='center' spacing={3} sx={{ width: '100%', height: '100%' }}>
            {_.times(24, LineSkeleton)}
        </Flexbox>
    );
});
GraphSkeleton.displayName = 'GraphSkeleton';
export default GraphSkeleton;
