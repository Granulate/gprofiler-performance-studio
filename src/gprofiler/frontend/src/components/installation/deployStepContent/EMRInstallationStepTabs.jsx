{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { keyframes } from '@emotion/react';
import { Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';
import Typography from '@mui/material/Typography';

const showUpAnimation = keyframes(`
  0%  { opacity: 0 }
  100%  { opacity: 1 }
`);

export const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div role='tabpanel' hidden={value !== index} {...other}>
            <>{children}</>
        </div>
    );
};

export const Tabs = ({ installationTab, setInstallationTab, tabs, containerPaintDurationInSeconds = 0.3 }) => {
    return (
        <div>
            <MuiTabs
                value={installationTab}
                onChange={(event, tabName) => {
                    setInstallationTab(tabName);
                }}
                sx={{
                    minHeight: 'auto',
                    mb: 5,
                    '& .MuiTabs-indicator': {
                        height: '3px',
                        backgroundColor: 'primary.main',
                        opacity: 0,
                        animation: `${showUpAnimation} .1s ${containerPaintDurationInSeconds}s linear forwards`,
                    },
                }}>
                {Array.isArray(tabs) &&
                    tabs.map((label, index) => (
                        <MuiTab
                            key={index}
                            sx={{
                                lineHeight: 'inherit',
                                minHeight: 40,
                                padding: '0 22px',
                                opacity: 0.5,
                                '&.Mui-selected': {
                                    opacity: 1,
                                },
                            }}
                            disableTouchRipple
                            label={
                                <Typography variant='caption1_lato' sx={{ color: 'grey.main' }}>
                                    {label}
                                </Typography>
                            }
                        />
                    ))}
            </MuiTabs>
        </div>
    );
};

export default Tabs;
