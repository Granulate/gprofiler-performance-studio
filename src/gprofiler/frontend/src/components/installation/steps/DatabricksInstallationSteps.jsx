{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
