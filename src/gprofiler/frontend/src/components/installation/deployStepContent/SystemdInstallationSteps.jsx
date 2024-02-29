{
    /*
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
     */
}

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
