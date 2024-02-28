

import { useState } from 'react';

import { getEMRSteps } from '../../../utils/installationUtils';
import InstallationSteps from '../InstallationSteps';
import ServiceDataStatus from '../ServiceDataStatus';

const EMR_DESCRIPTION_PARAGRAPH = `Create a bootstrap action that will launch the gProfiler on each node upon bootstrap.`;
const EMR_TITLE = `Install gProfiler as a Daemon on your EMR cluster`;

const EMRInstallationSteps = ({ apiKey }) => {
    const [serviceName, setServiceName] = useState('');

    return (
        <>
            <InstallationSteps
                apiKey={apiKey}
                title={EMR_TITLE}
                description={EMR_DESCRIPTION_PARAGRAPH}
                stepsData={getEMRSteps(apiKey, serviceName, setServiceName)}
            />
            <ServiceDataStatus serviceName={serviceName} />
        </>
    );
};

export default EMRInstallationSteps;
