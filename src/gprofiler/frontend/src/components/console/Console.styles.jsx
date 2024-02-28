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
