

import { useState } from 'react';

import { getOpenShiftSteps } from '../../../utils/installationUtils';
import InstallationSteps from '../InstallationSteps';
import ServiceDataStatus from '../ServiceDataStatus';

const OPENSHIFT_DESCRIPTION_PARAGRAPH = `Run the gProfiler Agent in your OpenShift cluster directly to collect profiles from your entire cluster. The Daemonset YAML installation runs a pod instance of the profiler on each node.`;

const OPENSHIFT_TITLE = `Installing on OpenShift cluster directly`;

const OpenShiftInstallationSteps = ({ apiKey }) => {
    const [serviceName, setServiceName] = useState('');
    const [namespace, setNamespace] = useState('');

    return (
        <>
            <InstallationSteps
                apiKey={apiKey}
                title={OPENSHIFT_TITLE}
                description={OPENSHIFT_DESCRIPTION_PARAGRAPH}
                stepsData={getOpenShiftSteps(apiKey, serviceName, setServiceName, namespace, setNamespace)}
            />
            <ServiceDataStatus serviceName={serviceName} />
        </>
    );
};

export default OpenShiftInstallationSteps;
