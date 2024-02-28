

import { Switch as MatSwitch } from '@mui/material';
import { styled } from '@mui/material/styles';

import { COLORS } from '@/theme/colors';

// this is styled to be identical to antd switch until we decide we want our own design.
const StyledSwitch = styled(MatSwitch)(({ theme }) => ({
    width: 44,
    height: 22,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 25,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(1px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(22px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: 'primary.main',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 18,
        height: 18,
        borderRadius: 45,
        transition: theme.transitions.create(['width'], {
            duration: 100,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 45,
        opacity: 1,
        backgroundColor: COLORS.PLAIN_GREY,
        boxSizing: 'border-box',
    },
}));

const Switch = (props) => {
    return <StyledSwitch {...props} />;
};

export default Switch;
