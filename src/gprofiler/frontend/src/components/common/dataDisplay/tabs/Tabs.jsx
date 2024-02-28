{/*
 * Copyright (C) 2023 Intel Corporation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/}



import { keyframes } from '@emotion/react';
import { Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

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

export const Tabs = ({ splitViewTab, setSplitViewTab, tabs, containerPaintDurationInSeconds = 0 }) => {
    const [tabsRerenderKey, setTabsRerenderKey] = useState('');
    useEffect(() => {
        if (containerPaintDurationInSeconds) {
            const t = setTimeout(() => setTabsRerenderKey('splitViewTabs'), 1000 * containerPaintDurationInSeconds);
            return () => clearTimeout(t);
        }
    }, [containerPaintDurationInSeconds]);

    return (
        <div key={tabsRerenderKey}>
            <MuiTabs
                centered
                value={splitViewTab}
                onChange={(event, tabName) => {
                    setSplitViewTab(tabName);
                }}
                sx={{
                    minHeight: 'auto',
                    '& .MuiTabs-indicator': {
                        height: '3px',
                        backgroundColor: 'grey.main',
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
