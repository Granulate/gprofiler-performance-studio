{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
