{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import styled from '@emotion/styled';

const StyledIcon = styled.svg`
    display: inline-block;
    margin-top: ${(props) => (Number.isInteger(props.margin) ? `${props.margin}px` : '0px')};
    margin-bottom: ${(props) => (Number.isInteger(props.margin) ? `${props.margin}px` : '0px')};
    margin-left: ${(props) =>
        Number.isInteger(props.marginLeft)
            ? `${props.marginLeft}px`
            : Number.isInteger(props.margin)
            ? `${props.margin}px`
            : '0px'};
    margin-right: ${(props) =>
        Number.isInteger(props.marginRight)
            ? `${props.marginRight}px`
            : Number.isInteger(props.margin)
            ? `${props.margin}px`
            : '0px'};
    vertical-align: ${(props) => (props.verticalAlign ? 'middle' : '')};
    transform: ${(props) =>
        props.verticalFlip ? 'rotate(180deg)' : props.rotate ? 'rotate(' + props.rotate + 'deg)' : ''};
    fill: ${(props) => props.color || '#000000'};
    &:hover {
        fill: ${(props) => props.hoverColor};
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(359deg);
        }
    }
    transition: fill 0.7s ease;
    animation: ${(props) => (props.spin ? 'spin 1s linear infinite' : '')};
`;

const IconBase = (props) => {
    return (
        <StyledIcon
            ref={props.ref}
            width={`${props.width || props.size || '20'}px`}
            height={`${props.height || props.size || '20'}px`}
            viewBox={props.viewbox || '0 0 24 24'}
            margin={props.margin}
            spin={props.spin}
            marginLeft={props.marginLeft}
            marginRight={props.marginRight}
            verticalAlign={props.verticalAlign}
            verticalFlip={props.verticalFlip}
            rotate={props.rotate}
            color={props.color}
            hoverColor={props.hoverColor}
            preserveAspectRatio='none'>
            {props.altText && <title>{props.altText}</title>}
            <path d={props.icon}></path>
        </StyledIcon>
    );
};

export default IconBase;
