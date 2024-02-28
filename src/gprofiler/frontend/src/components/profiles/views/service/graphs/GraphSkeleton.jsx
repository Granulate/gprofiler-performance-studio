

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
