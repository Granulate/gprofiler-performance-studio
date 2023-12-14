{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
