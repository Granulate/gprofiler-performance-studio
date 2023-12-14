{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import styled from '@emotion/styled';
import { Grid, Skeleton, useTheme } from '@mui/material';
import { useInterval } from 'ahooks';
import { useState } from 'react';

import FlamegraphStyles from './views/flamegraph/flamegraph.style';

const Container = styled.div`
    height: 100%;
    width: 100%;
    padding: 10px;
`;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const FgSkeleton = (gridValue, index) => {
    const theme = useTheme();
    return (
        <Grid
            item
            key={index}
            xs={gridValue}
            sx={{
                transition: theme.transitions.create('all', {
                    easing: theme.transitions.easing.sharp,
                    duration: '1.5s',
                }),
                margin: 0,
                padding: 0,
            }}>
            <Skeleton height={FlamegraphStyles.main.blockHeight + 8} width='100%' />
            <Skeleton height={FlamegraphStyles.main.blockHeight + 8} width='80%' />
            <Skeleton height={FlamegraphStyles.main.blockHeight + 8} width='75%' />
            <Skeleton height={FlamegraphStyles.main.blockHeight + 8} width='40%' />
            <Skeleton height={FlamegraphStyles.main.blockHeight + 8} width='40%' />
            <Skeleton height={FlamegraphStyles.main.blockHeight + 8} width='20%' />
            <Skeleton height={FlamegraphStyles.main.blockHeight + 8} width='5%' />
            <Skeleton height={FlamegraphStyles.main.blockHeight + 8} width='1%' />
        </Grid>
    );
};
const FGLoader = () => {
    const [gridNumbers, setGridNumbers] = useState([3, 3, 3, 3]);

    useInterval(() => {
        const randomSize1 = Math.floor(Math.random() * 5) + 1;
        const randomSize2 = Math.floor(Math.random() * 5) + 1;
        const randomSize3and4 = Math.floor((12 - randomSize1 - randomSize2) / 2);
        let gridArr = [randomSize1, randomSize2, randomSize3and4, randomSize3and4];
        shuffleArray(gridArr);
        setGridNumbers(gridArr);
    }, 2000);

    return (
        <Container>
            <Skeleton height={FlamegraphStyles.main.blockHeight + 8} />
            <Grid container spacing={1}>
                {gridNumbers.map((num, index) => FgSkeleton(num, index))}
            </Grid>
        </Container>
    );
};

export default FGLoader;
