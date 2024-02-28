

import { useState } from 'react';

import { getDataprocSteps } from '@/utils/installationUtils';

import InstallationSteps from '../InstallationSteps';
import ServiceDataStatus from '../ServiceDataStatus';

const DATAPROC_TITLE = 'Installing Google Dataproc';
const DATAPROC_DESCRIPTION =
    'This installation method will install the gProfiler agent on all of your workers when the cluster is created.';

const DataprocInstallationSteps = ({ apiKey }) => {
    const [serviceName, setServiceName] = useState('');
    const [clusterName, setClusterName] = useState('');
    const [bucketName, setBucketName] = useState('');
    const [region, setRegion] = useState('');

    return (
        <>
            <InstallationSteps
                apiKey={apiKey}
                title={DATAPROC_TITLE}
                description={DATAPROC_DESCRIPTION}
                stepsData={getDataprocSteps({
                    apiKey,
                    serviceName,
                    setServiceName,
                    clusterName,
                    setClusterName,
                    bucketName,
                    setBucketName,
                    region,
                    setRegion,
                })}
            />
            <ServiceDataStatus serviceName={serviceName} />
        </>
    );
};

export default DataprocInstallationSteps;
