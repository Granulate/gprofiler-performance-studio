

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
