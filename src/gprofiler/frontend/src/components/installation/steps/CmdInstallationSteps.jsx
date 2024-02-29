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

import { ENV_VAR_PREFIX } from '@/utils/consts';

import { getCommandLineSteps } from '../../../utils/installationUtils';
import InstallationSteps from '../InstallationSteps';
import ServiceDataStatus from '../ServiceDataStatus';

const CMD_TITLE = 'Command-line installation';
const CMD_DESCRIPTION =
    'Using the command-line installation places an executable that runs the gProfiler as a process on the host machine.';

const CmdInstallationSteps = ({ apiKey }) => {
    const [serviceName, setServiceName] = useState('');
    const [serverHost, setServerHost] = useState(ENV_VAR_PREFIX.VITE_SERVER_HOST);

    return (
        <>
            <InstallationSteps
                apiKey={apiKey}
                title={CMD_TITLE}
                description={CMD_DESCRIPTION}
                stepsData={getCommandLineSteps(apiKey, serviceName, setServiceName, serverHost, setServerHost)}
            />
            <ServiceDataStatus serviceName={serviceName} />
        </>
    );
};

export default CmdInstallationSteps;
