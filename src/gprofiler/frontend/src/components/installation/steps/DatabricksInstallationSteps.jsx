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
