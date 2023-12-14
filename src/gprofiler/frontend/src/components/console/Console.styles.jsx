{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import styled from '@emotion/styled';
import Box from '@mui/material/Box';

export const LayoutContainer = styled(Box)`
    display: flex;
`;

export const ContentContainer = styled(Box)`
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    min-height: 100vh;
    align-items: stretch;
    display: flex;
    flex-direction: column;
`;

export const Main = styled(Box)`
    width: 100%;
    flex-grow: 1;
    align-items: stretch;
    display: flex;
    flex-direction: column;
`;
