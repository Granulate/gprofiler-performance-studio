{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Tooltip as MuiTooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import { ColorPalette } from '@/theme/colors';

const StyledTooltip = styled(({ className, ...props }) => <MuiTooltip {...props} classes={{ popper: className }} />, {
    shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'maxWidth' && prop !== 'noPadding',
})(({ theme, variant, maxWidth, size, noPadding }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: variant === 'dark' ? ColorPalette.grey.dark : ColorPalette.white.main,
        color: variant === 'dark' ? ColorPalette.white.main : ColorPalette.grey.dark,
        border: 0,
        boxShadow: '0px 3px 12px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31)',
        maxWidth: maxWidth || 'inherit',
        padding: noPadding
            ? 0
            : size === 'small'
            ? `${theme.spacing(2)} ${theme.spacing(3)}`
            : `${theme.spacing(4)} ${theme.spacing(5)}`,
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: variant === 'dark' ? ColorPalette.grey.dark : ColorPalette.white.main,
    },
}));

const Tooltip = ({
    variant = 'light',
    size = 'normal',
    placement = 'top',
    noPadding = false,
    content,
    children,
    ...props
}) => {
    return (
        <StyledTooltip
            variant={variant}
            placement={placement}
            size={size}
            arrow={true}
            title={content}
            noPadding={noPadding}
            {...props}>
            {children}
        </StyledTooltip>
    );
};

Tooltip.propTypes = {
    variant: PropTypes.oneOf(['dark', 'light']),
    placement: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['small', 'normal']),
};

export default Tooltip;
