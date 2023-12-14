{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
