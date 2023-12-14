{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
