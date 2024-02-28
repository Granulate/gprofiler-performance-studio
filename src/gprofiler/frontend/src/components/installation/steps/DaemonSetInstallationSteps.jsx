

import { useState } from 'react';

import { getDaemonSetSteps } from '../../../utils/installationUtils';
import InstallationSteps from '../InstallationSteps';
import ServiceDataStatus from '../ServiceDataStatus';

const DaemonSET_DESCRIPTION_PARAGRAPH = `Run the gProfiler Agent in your Kubernetes cluster directly to collect profiles from your entire cluster. The Daemonset YAML installation runs a pod instance of the profiler on each node.`;

const DaemonSET_TITLE = `Installing on Kubernetes cluster directly`;

const DaemonSetInstallationSteps = ({ apiKey }) => {
    const [serviceName, setServiceName] = useState('');
    const [namespace, setNamespace] = useState('');

    return (
        <>
            <InstallationSteps
                apiKey={apiKey}
                title={DaemonSET_TITLE}
                description={DaemonSET_DESCRIPTION_PARAGRAPH}
                stepsData={getDaemonSetSteps(apiKey, serviceName, setServiceName, namespace, setNamespace)}
            />
            <ServiceDataStatus serviceName={serviceName} />
        </>
    );
};

export default DaemonSetInstallationSteps;
