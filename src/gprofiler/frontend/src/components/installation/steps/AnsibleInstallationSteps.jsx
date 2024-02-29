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

import { getAnsibleSteps } from '../../../utils/installationUtils';
import InstallationSteps from '../InstallationSteps';
import ServiceDataStatus from '../ServiceDataStatus';

const ANSIBLE_DESCRIPTION_PARAGRAPH = `The installation runs the gProfiler executable.`;

const ANSIBLE_TITLE = `Installing Ansible`;

const AnsibleInstallationSteps = ({ apiKey }) => {
    const [serviceName, setServiceName] = useState('');

    return (
        <>
            <InstallationSteps
                apiKey={apiKey}
                title={ANSIBLE_TITLE}
                description={ANSIBLE_DESCRIPTION_PARAGRAPH}
                stepsData={getAnsibleSteps(apiKey, serviceName, setServiceName)}
            />
            <ServiceDataStatus serviceName={serviceName} />
        </>
    );
};

export default AnsibleInstallationSteps;
