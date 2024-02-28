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
