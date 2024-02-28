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



import Link from '@mui/material/Link';

import { ArrowRight } from '../../../svg';
import { COLORS } from '../../../theme/colors';

const SkewedButton = ({ href = '', children, target = '_blank' }) => (
    <Link
        href={href}
        target={target}
        sx={{
            clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
            color: 'white.main',
            backgroundColor: 'primary.main',
            border: 'none',
            textDecoration: 'none',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '2px',
            py: 0,
            px: 6,
            cursor: 'pointer',
            '& p': {
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: '14px',
                m: 0,
            },
            '& svg': {
                ml: 3,
                display: 'inline-flex',
            },
            '& path': {
                transition: 'fill .3s',
            },
            '&:hover': {
                color: 'secondary.main',
            },
            '&:hover path': {
                fill: COLORS.SECONDARY_ORANGE,
            },
        }}
        rel='noreferrer'>
        <p>{children}</p>
        <ArrowRight />
    </Link>
);

export default SkewedButton;
