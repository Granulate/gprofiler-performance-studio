

import { useState } from 'react';

import { getECSSteps } from '../../../utils/installationUtils';
import InstallationSteps from '../InstallationSteps';
import ServiceDataStatus from '../ServiceDataStatus';

const ECS_DESCRIPTION_PARAGRAPH = `Install gProfiler as a Daemon on your ECS cluster`;

const ECS_TITLE = `Installing on ECS cluster`;

const ECSInstallationSteps = ({ apiKey }) => {
    const [serviceName, setServiceName] = useState('');

    return (
        <>
            <InstallationSteps
                apiKey={apiKey}
                title={ECS_TITLE}
                description={ECS_DESCRIPTION_PARAGRAPH}
                stepsData={getECSSteps(apiKey, serviceName, setServiceName)}
            />
            <ServiceDataStatus serviceName={serviceName} />
        </>
    );
};

export default ECSInstallationSteps;
