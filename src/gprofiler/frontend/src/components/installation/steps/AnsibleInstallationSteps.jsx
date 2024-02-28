

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
