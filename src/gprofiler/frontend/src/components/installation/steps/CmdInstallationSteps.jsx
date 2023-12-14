{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
