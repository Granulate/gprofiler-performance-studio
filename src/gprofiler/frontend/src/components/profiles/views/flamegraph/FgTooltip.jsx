{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Tippy from '@tippyjs/react';
import _ from 'lodash';
import { useContext } from 'react';
import { followCursor as followCursorPlugin } from 'tippy.js';

import { FgHoverContext } from '@/states/flamegraph/FgHoverContext';
import { COLORS } from '@/theme/colors';

const Container = styled.div`
    background: none;
    border-radius: 6px;
    color: black;
    text-align: center;
`;

const TopLine = styled.div`
    background: ${COLORS.BLUE_4};
    border-radius: 5px 5px 0 0;
    padding: 3px 10px 3px 5px;
    color: white;
`;

const BottomLine = styled.div`
    display: flex;
    background: ${COLORS.WHITE};
    justify-content: center;
    border-radius: 0 0 5px 5px;
    padding: 3px;
`;

const Title = styled(Typography)`
    padding: 3px 10px 3px 5px;
    word-break: break-all;
`;

const Info = styled(Typography)`
    padding: 0 10px;
`;

const StyledTippy = styled(Tippy)`
    background: none;
    padding: 0;
    margin: 0;
    width: auto !important;
    max-width: 800px !important;
    .tippy-content {
        padding: 0;
    }
    .tippy-arrow {
        color: ${COLORS.BLUE_4};
        transform: translate3d(0px, 4px, 0px) !important;
    }
`;

const FgTooltip = ({ ctx = null }) => {
    const { hoverData: tooltipData } = useContext(ctx || FgHoverContext);
    const { name, ownTime, cpuTime, value } = tooltipData;

    const content = (
        <Container>
            <TopLine>
                <Title variant='body3_lato'>{name}</Title>
            </TopLine>
            <BottomLine>
                <Info variant='body3_lato'>Total time {cpuTime}%</Info>
                <Info variant='body3_lato'>Own time {ownTime}%</Info>
                <Info variant='body3_lato'>Samples {value?.toLocaleString()}</Info>
            </BottomLine>
        </Container>
    );

    return (
        <StyledTippy
            content={content}
            visible={!_.isEmpty(tooltipData)}
            plugins={[followCursorPlugin]}
            placement='right'
            arrow={true}
            offset={[15, 15]}
            duration={[250, 0]}
            followCursor={true}
        />
    );
};

export default FgTooltip;
