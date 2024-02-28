

import { useState } from 'react';

import { getDatabricksSteps } from '../../../utils/installationUtils';
import InstallationSteps from '../InstallationSteps';
import ServiceDataStatus from '../ServiceDataStatus';

const DATABRICKS_TITLE = 'Databricks Command-line Installation';
const DATABRICKS_DESCRIPTION =
    'Run the following command on each node you would like to profile.  This installation places an executable that runs the gProfiler as a process on the host machine.';

const DatabricksInstallationSteps = ({ apiKey }) => {
    const [serviceName, setServiceName] = useState('');
    const [shouldUseJobName, setShouldUseJobName] = useState(false);

    const handleUseJobNameCheck = (e) => {
        setShouldUseJobName(e.target.checked);
    };

    return (
        <>
            <InstallationSteps
                apiKey={apiKey}
                title={DATABRICKS_TITLE}
                description={DATABRICKS_DESCRIPTION}
                stepsData={getDatabricksSteps(
                    apiKey,
                    serviceName,
                    setServiceName,
                    shouldUseJobName,
                    handleUseJobNameCheck
                )}
            />
            <ServiceDataStatus serviceName={serviceName} />
        </>
    );
};

export default DatabricksInstallationSteps;
