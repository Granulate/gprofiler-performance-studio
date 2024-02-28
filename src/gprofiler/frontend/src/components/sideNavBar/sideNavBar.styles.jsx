

import { ListItemButton } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/system';

import { COLORS } from '@/theme/colors';

import Tooltip from '../common/dataDisplay/muiToolTip/Tooltip';

const drawerWidth = 172;
const drawerWidthClosed = 60;

export const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: open ? drawerWidth : drawerWidthClosed,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    transition: theme.transitions.create('width', {
        easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
        duration: 295,
    }),
    '& .MuiDrawer-paper': {
        backgroundColor: '#151832',
        overflowX: 'hidden',
        width: open ? drawerWidth : drawerWidthClosed,
        ...(open && {
            transition: theme.transitions.create('width', {
                easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
                duration: 325,
            }),
        }),
        ...(!open && {
            transition: theme.transitions.create('width', {
                easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
                duration: 295,
            }),
        }),
    },
}));

export const SideBarTooltip = ({ children, ...props }) => {
    return (
        <Tooltip placement='right' variant='dark' size='small' {...props}>
            {children}
        </Tooltip>
    );
};

export const SideBarItem = styled(ListItemButton)({
    paddingTop: 3,
    paddingBottom: 3,
    transition: 'all .2s ease-in',
    color: '#818181',
    height: '46px',
    '&.Mui-selected': {
        color: COLORS.WHITE,
        background: 'rgba(255, 255, 255, 0.2)',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
        },
        '&:before': {
            content: `' '`,
            width: '4px',
            height: '100%',
            left: '0',
            bottom: '0',
            position: 'absolute',
            background: COLORS.WHITE,
            borderRadius: '0 2em 2em 0',
        },
    },
    '&:hover': {
        background: 'none',
        color: COLORS.WHITE,
    },
});
