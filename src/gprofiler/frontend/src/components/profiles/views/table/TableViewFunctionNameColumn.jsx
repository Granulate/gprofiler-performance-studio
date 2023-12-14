{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Link } from '@mui/material';
import { useRef } from 'react';

import Tooltip from '@/components/common/dataDisplay/muiToolTip/Tooltip';
import Flexbox from '@/components/common/layout/Flexbox';

import ShortenedFunctionName from './ShortenedFunctionName';

const FunctionNameColumn = ({ functionName, coreFunctionName, selected = false }) => {
    const el = useRef(undefined);
    const isShortened = functionName !== coreFunctionName;

    return (
        <Flexbox sx={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis' }} spacing={3}>
            <Tooltip content={functionName} placement='bottom-start' delay={[500, 0]} arrow={false} followCursor={true}>
                <Link
                    ref={el}
                    sx={{
                        textDecoration: selected ? 'underline' : 'none',
                        ':hover': { textDecoration: 'underline' },
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                        variant: 'body1_lato',
                        color: 'grey.dark',
                    }}>
                    {isShortened ? (
                        <ShortenedFunctionName functionName={functionName} coreFunctionName={coreFunctionName} />
                    ) : (
                        functionName
                    )}
                </Link>
            </Tooltip>
        </Flexbox>
    );
};

export default FunctionNameColumn;
