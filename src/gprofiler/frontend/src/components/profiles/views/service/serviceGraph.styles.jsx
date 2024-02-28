

import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

import { COLORS } from '@/theme/colors';

export const StyledTabs = styled(TabList)({
    minHeight: '40px !important',
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: COLORS.BLACK,
    },
});

export const StyledTab = styled(Tab)(({ theme }) => ({
    ...theme.typography.caption1,
    color: theme.palette.grey.dark,
    minHeight: '40px !important',
    minWidth: '30px',
    padding: '0 10px',
    '&.Mui-selected': {
        color: COLORS.BLACK,
    },
}));

export const StyledTabPanel = styled(TabPanel)({
    height: '220px',
    padding: 0,
});
