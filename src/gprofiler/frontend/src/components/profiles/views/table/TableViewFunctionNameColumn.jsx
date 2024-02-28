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
