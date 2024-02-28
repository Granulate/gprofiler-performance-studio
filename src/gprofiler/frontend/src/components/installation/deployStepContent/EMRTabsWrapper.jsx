

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
