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

import { Box } from '@mui/material';
import { useState } from 'react';

import Flexbox from '@/components/common/layout/Flexbox';

import EMRConsoleStepContent from './EMRConsoleStepContent';
import EMRDeployStepContent from './EMRDeployStepContent';
import EMRDeployStepTitle from './EMRDeployStepTitle';
import { TabPanel, Tabs } from './EMRInstallationStepTabs';

const ERM_INSTALLATION_ANIMATION_DURATION_IN_SECONDS = 0.2;

const EMRDeployTabs = ({ apiKey, serviceName }) => {
    const [installationTab, setInstallationTab] = useState(0);

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    installationTab={installationTab}
                    setInstallationTab={setInstallationTab}
                    tabs={['CLI', 'Console']}
                    containerPaintDurationInSeconds={ERM_INSTALLATION_ANIMATION_DURATION_IN_SECONDS}
                />
            </Box>
            <Flexbox column spacing={3}>
                <TabPanel value={installationTab} index={0}>
                    <Box>
                        <EMRConsoleStepContent serviceName={serviceName} apiKey={apiKey} />
                    </Box>
                </TabPanel>
                <TabPanel value={installationTab} index={1}>
                    <Box>
                        <EMRDeployStepTitle />
                        <EMRDeployStepContent serviceName={serviceName} apiKey={apiKey} />
                    </Box>
                </TabPanel>
            </Flexbox>
        </>
    );
};

export default EMRDeployTabs;
