

import { useState } from 'react';

import { getSystemdSteps } from '@/utils/installationUtils';

import InstallationSteps from '../InstallationSteps';
import ServiceDataStatus from '../ServiceDataStatus';

const SYSTEMD_DESCRIPTION_PARAGRAPH = `You can generate a systemd service configuration that runs gProfiler as an executable:`;

const SYSTEMD_TITLE = `Installing systemd`;

const SystemdInstallationSteps = ({ apiKey }) => {
    const [serviceName, setServiceName] = useState('');

    return (
        <>
            <InstallationSteps
                title={SYSTEMD_TITLE}
                apiKey={apiKey}
                description={SYSTEMD_DESCRIPTION_PARAGRAPH}
                stepsData={getSystemdSteps(apiKey, serviceName, setServiceName)}
            />
            <ServiceDataStatus serviceName={serviceName} />
        </>
    );
};

export default SystemdInstallationSteps;
