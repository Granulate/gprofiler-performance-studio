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

import { Box } from '@mui/material';

import Flexbox from '@/components/common/layout/Flexbox';
import { getFunctioNameEdges } from '@/utils/tableViewUtils';

const ShortenedFunctionName = ({ coreFunctionName, functionName }) => {
    const { start, end } = getFunctioNameEdges(functionName, coreFunctionName);
    return (
        <Flexbox>
            <Box
                component={'p'}
                sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',

                    direction: 'rtl',
                    textAlign: 'left',
                }}>
                {start}&lrm;
            </Box>
            <Box component={'p'} style={{ fontWeight: 'bold' }}>
                {coreFunctionName}
            </Box>
            <Box
                component={'p'}
                sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                {end}
            </Box>
        </Flexbox>
    );
};

export default ShortenedFunctionName;
