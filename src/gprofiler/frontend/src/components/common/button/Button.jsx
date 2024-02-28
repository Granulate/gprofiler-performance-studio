

import { Button as MuiButton, IconButton } from '@mui/material';
import { Link as MatLink } from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const StyledButton = styled(MuiButton, { shouldForwardProp: (prop) => prop !== 'noHover' && prop !== 'underline' })(
    ({ underline, noHover }) => ({
        textDecoration: underline ? 'underline' : '',
        textTransform: 'none',
        lineHeight: 'inherit',
        '&:hover': {
            backgroundColor: underline || noHover ? 'transparent' : '',
        },
    })
);
const LinkWrapper = ({ children, href, underline }) => {
    return (
        <MatLink
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            sx={{ textDecoration: underline ? 'underline' : 'none' }}>
            {children}
        </MatLink>
    );
};
const GenericIconButton = forwardRef(({ children, sxOverrides, hidden, noHover, ...props }, ref) => {
    return (
        <IconButton
            sx={{
                visibility: hidden ? 'hidden' : 'visible',
                '&:hover': {
                    backgroundColor: noHover ? 'transparent' : '',
                },
                ...sxOverrides,
            }}
            ref={ref}
            {...props}
            component={props.to ? Link : null}>
            {children}
        </IconButton>
    );
});
GenericIconButton.displayName = 'GenericIconButton';

const GenericButton = forwardRef(({ children, sxOverrides, hidden, ...props }, ref) => {
    return (
        <StyledButton
            ref={ref}
            sx={{ visibility: hidden ? 'hidden' : 'visible', ...sxOverrides }}
            {...props}
            component={props.to ? Link : null}>
            {children}
        </StyledButton>
    );
});
GenericButton.displayName = 'GenericButton';

const Button = forwardRef(
    (
        {
            variant = 'contained',
            size = 'medium',
            children,
            iconOnly = false,
            hidden = false,
            sxOverrides = {},
            href = undefined,
            underline = undefined,
            fullWidth = undefined,
            noHover = undefined,
            startIcon = undefined,
            ...props
        },
        ref
    ) => {
        if (iconOnly) {
            if (href) {
                return (
                    <LinkWrapper href={href} underline={underline}>
                        <GenericIconButton
                            ref={ref}
                            hidden={hidden}
                            underline={underline}
                            noHover={noHover}
                            sxOverrides={sxOverrides}
                            {...props}>
                            {children}
                        </GenericIconButton>
                    </LinkWrapper>
                );
            }
            return (
                <GenericIconButton
                    ref={ref}
                    hidden={hidden}
                    underline={underline}
                    noHover={noHover}
                    sxOverrides={sxOverrides}
                    {...props}>
                    {children}
                </GenericIconButton>
            );
        }
        if (href) {
            return (
                <LinkWrapper href={href} underline={underline}>
                    <GenericButton
                        ref={ref}
                        hidden={hidden}
                        underline={underline}
                        variant={variant}
                        href={href}
                        size={size}
                        noHover={noHover}
                        fullWidth={fullWidth}
                        sxOverrides={sxOverrides}
                        startIcon={startIcon}
                        {...props}>
                        {children}
                    </GenericButton>
                </LinkWrapper>
            );
        }
        return (
            <GenericButton
                ref={ref}
                hidden={hidden}
                underline={underline}
                variant={variant}
                href={href}
                size={size}
                noHover={noHover}
                fullWidth={fullWidth}
                sxOverrides={sxOverrides}
                startIcon={startIcon}
                {...props}>
                {children}
            </GenericButton>
        );
    }
);
Button.displayName = 'Button';
Button.propTypes = {
    variant: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    noHover: PropTypes.bool,
    fullWidth: PropTypes.bool,
    underline: PropTypes.bool,
    startIcon: PropTypes.element,
    endIcon: PropTypes.element,
    iconOnly: PropTypes.bool,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    href: PropTypes.string,
};
export default Button;
