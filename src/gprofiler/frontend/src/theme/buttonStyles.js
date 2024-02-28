

import { COLORS } from './colors';

export const buttonStyles = {
    styleOverrides: {
        root: {
            borderRadius: '45px',
            boxShadow: 'none',
            color: COLORS.WHITE,
        },
        sizeSmall: {
            fontSize: '12px',
            padding: '1px 6px',
            minWidth: '40px',
            '& .MuiButton-startIcon': {
                marginRight: '3px',
            },
        },
        sizeMedium: {
            fontSize: '14px',
            padding: '3px 11px',
        },
        sizeLarge: {
            fontSize: '14px',
            padding: '5px 30px',
        },
        outlined: {
            background: COLORS.WHITE,
            color: COLORS.BLACK,
            border: `none`,
            '&:hover': {
                background: COLORS.WHITE,
                border: `none`,
            },
        },
        textInherit: {
            color: COLORS.BLACK,
        },
        textPrimary: {
            color: COLORS.PRIMARY_PURPLE,
        },
        textSecondary: {
            color: COLORS.WHITE,
        },
    },
};

export const iconButtonStyles = {
    styleOverrides: {
        colorPrimary: {
            background: COLORS.PRIMARY_PURPLE,
            '&:hover': {
                background: COLORS.DARK_PURPLE,
            },
            '&.Mui-disabled': {
                background: COLORS.PLAIN_GREY,
                opacity: 0.5,
            },
        },
        colorInherit: {
            background: 'none',
            '&:hover': {
                background: 'none',
            },
        },
    },
};
