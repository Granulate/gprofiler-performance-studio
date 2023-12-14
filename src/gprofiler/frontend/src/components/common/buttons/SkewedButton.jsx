{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
