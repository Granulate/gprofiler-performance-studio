

import { useState } from 'react';

import { getDockerComposeSteps } from '../../../utils/installationUtils';
import InstallationSteps from '../InstallationSteps';
import ServiceDataStatus from '../ServiceDataStatus';

const DOCKER_COMPOSE_TITLE = 'Installing via Docker Compose';
const DOCKER_COMPOSE_DESCRIPTION =
    'This installation method runs a signed Docker container that embeds the gProfiler to monitor your host.';

const DockerComposeInstallationSteps = ({ apiKey }) => {
    const [serviceName, setServiceName] = useState('');

    return (
        <>
            <InstallationSteps
                apiKey={apiKey}
                title={DOCKER_COMPOSE_TITLE}
                description={DOCKER_COMPOSE_DESCRIPTION}
                stepsData={getDockerComposeSteps({
                    apiKey,
                    serviceName,
                    setServiceName,
                })}
            />
            <ServiceDataStatus serviceName={serviceName} />
        </>
    );
};

export default DockerComposeInstallationSteps;
