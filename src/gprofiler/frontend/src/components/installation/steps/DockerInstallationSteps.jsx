

import { useState } from 'react';

import { ENV_VAR_PREFIX } from '@/utils/consts';

import { getDockerSteps } from '../../../utils/installationUtils';
import InstallationSteps from '../InstallationSteps';
import ServiceDataStatus from '../ServiceDataStatus';

const DOCKER_TITLE = 'Installing a Docker image';
const DOCKER_DESCRIPTION = `This installation method runs a signed Docker container that embeds the gProfiler to monitor your host.`;

const DockerInstallationSteps = ({ apiKey }) => {
    const [serviceName, setServiceName] = useState('');
    const [serverHost, setServerHost] = useState(ENV_VAR_PREFIX.VITE_SERVER_HOST);

    return (
        <>
            <InstallationSteps
                apiKey={apiKey}
                title={DOCKER_TITLE}
                description={DOCKER_DESCRIPTION}
                stepsData={getDockerSteps(apiKey, serviceName, setServiceName, serverHost, setServerHost)}
            />
            <ServiceDataStatus serviceName={serviceName} />
        </>
    );
};

export default DockerInstallationSteps;
