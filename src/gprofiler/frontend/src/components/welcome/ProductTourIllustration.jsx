{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { keyframes } from '@emotion/react';
import { Box, Link, Typography } from '@mui/material';

import { COLORS } from '../../theme/colors';
import Icon from '../common/icon/Icon';
import { ICONS_NAMES } from '../common/icon/iconsData';
import Flexbox from '../common/layout/Flexbox';

const dash = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const float = keyframes`
  0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(-5px);
	}
	100% {
		transform: translatey(0px);
	}
`;

const fadein = keyframes`
  to   { opacity: 1; }
`;

function SvgMark(props) {
    return (
        <svg
            width={15}
            height={20}
            viewBox='0 0 15 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
            className='mark'>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M15 7.094c0 3.986-7.108 12.83-7.108 12.83S.784 10.962.784 7.095c0-1.881.748-3.686 2.082-5.016a7.115 7.115 0 0110.052 0A7.088 7.088 0 0115 7.094zM8 10a3 3 0 100-6 3 3 0 000 6z'
                fill={COLORS.PRIMARY_PURPLE}
            />
        </svg>
    );
}

function SvgMarkPoint(props) {
    return (
        <svg
            width={12}
            height={5}
            viewBox='0 0 12 5'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
            className='markpoint'>
            <path
                d='M.341 2.488c0-1.136 2.476-1.993 5.55-1.993v-.04c3.076 0 5.552.897 5.552 2.033S8.967 4.481 5.892 4.481.34 3.624.34 2.488z'
                fill='#151832'
            />
        </svg>
    );
}

function IllustrationLeftPath(props) {
    return (
        <svg
            width={71}
            height={36}
            viewBox='0 0 71 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
            className='shortPath'>
            <path d='M69 1H26V1C16.3605 2.28527 16.4469 16.1804 26 18V18H62.5V18C71.604 19.465 71.9637 32.4332 62.9549 34.4006L62.5 34.5H0' />
        </svg>
    );
}

function IllustrationBottomPath(props) {
    return (
        <svg
            width='75'
            height={33}
            className='longPath'
            viewBox='0 0 75 33'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}>
            <path d='M1 0V29.5V29.5C1 30.8807 2.11929 32 3.5 32V32H74.5' />
        </svg>
    );
}

function SvgCircle(props) {
    return (
        <svg
            width={5}
            height={5}
            viewBox='0 0 5 5'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
            className='circle'>
            <path
                d='M1.086.576a2.42 2.42 0 013.038.308 2.409 2.409 0 01-.774 3.929 2.42 2.42 0 01-2.642-.52A2.41 2.41 0 011.086.577z'
                fill='#151832'
            />
        </svg>
    );
}

function IllustrationRightPath(props) {
    return (
        <svg
            width={314}
            height={51}
            viewBox='0 0 314 51'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
            className='rightPath'>
            <path d='M0 50h311a2 2 0 002-2V.836' stroke='#151832' strokeWidth={2} />
        </svg>
    );
}

const ProductTourIllustration = () => {
    return (
        <Flexbox
            alignItems='flex-end'
            sx={{
                alignSelf: 'center',
                position: 'relative',
                minWidth: '322px',
                maxWidth: '495px',
                marginTop: [10, 10, 10, 0],
                marginLeft: 12,
                marginRight: 5,
                '& svg': {
                    position: 'absolute',
                    stroke: 'black',
                    animationIterationCount: 1,
                    animationDelay: '4s',
                    strokeDasharray: '188.8',
                    strokeDashoffset: '188.8',
                    animation: `${dash} 1s ease-in forwards`,
                },
                '& svg.shortPath': {
                    left: '5px',
                    bottom: 31,
                    strokeWidth: '2.5px',
                    animationDelay: '2s',
                },
                '& svg.circle': {
                    left: 0,
                    bottom: '30px',
                    opacity: 0,
                    animation: `${fadein} .1s forwards`,
                    animationDelay: '3s',
                },
                '& svg.longPath': {
                    animationDelay: '3s',
                    bottom: 0,
                    left: '1px',
                    strokeWidth: '3px',
                    strokeDasharray: '556',
                    strokeDashoffset: '556',
                },
                '& svg.rightPath': {
                    animationDelay: '3.3s',
                    width: '85%',
                    height: 'auto',
                    bottom: 0,
                    right: 0,
                    strokeWidth: '0px',
                    strokeDasharray: '700',
                    strokeDashoffset: '700',
                },
                '& svg.mark': {
                    bottom: 72,
                    left: 75,
                    stroke: COLORS.PRIMARY_PURPLE,
                    fill: COLORS.PRIMARY_PURPLE,
                    animation: `${float} 2s ease-in-out infinite, ${fadein} .5s ease-in forwards`,
                    animationDelay: '1s',
                    opacity: 0,
                },
                '& svg.markpoint': {
                    bottom: 63,
                    left: 77,
                    stroke: 'black',
                },
            }}>
            <IllustrationLeftPath />
            <SvgCircle />
            <IllustrationRightPath />
            <Box sx={{ position: 'relative', paddingLeft: '100px', paddingRight: '15px' }}>
                <SvgMark />
                <SvgMarkPoint />
                <Typography
                    variant='subtitle1'
                    sx={{
                        color: 'primary.main',
                        marginBottom: 2,
                        animation: `${fadein} 1s ease-in forwards`,
                        animationDelay: '.5s',
                        opacity: 0,
                    }}>
                    Product tour
                </Typography>
                <Typography
                    variant='body4'
                    sx={{
                        animation: `${fadein} 1s ease-in forwards`,
                        animationDelay: '.8s',
                        opacity: 0,
                        position: 'relative',
                        width: '100%',
                        bottom: '5px',
                    }}>
                    Take our interactive tour to learn more about profiling get familiar with gProfiler
                </Typography>
                <IllustrationBottomPath />
                <Link
                    href='https://granulate.tourial.com/ProductTour'
                    target='_blank'
                    sx={{
                        borderRadius: '50%',
                        width: 35,
                        height: 35,
                        position: 'absolute',
                        right: '-15px',
                        bottom: 50,
                        color: 'white.main',
                        backgroundColor: 'primary.main',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
                        opacity: 0,
                        animation: `${fadein} .5s forwards`,
                        animationDelay: '3.9s',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'transform .3s',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        },
                        '& svg': {
                            '& path': {
                                stroke: 'white',
                                fill: 'white',
                            },
                            position: 'absolute',
                            top: 'calc(50% - 4px)',
                            left: 'calc(50% - 3px)',
                        },
                    }}
                    rel='noreferrer'>
                    <Icon name={ICONS_NAMES.PaginationRight} vertical color={'white'} size={20} />
                </Link>
            </Box>
        </Flexbox>
    );
};

export default ProductTourIllustration;
