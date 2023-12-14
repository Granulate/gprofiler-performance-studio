{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
