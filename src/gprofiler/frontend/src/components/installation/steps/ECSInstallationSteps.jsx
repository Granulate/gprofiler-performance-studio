{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { useState } from 'react';

import { getECSSteps } from '../../../utils/installationUtils';
import InstallationSteps from '../InstallationSteps';
import ServiceDataStatus from '../ServiceDataStatus';

const ECS_DESCRIPTION_PARAGRAPH = `Install gProfiler as a Daemon on your ECS cluster`;

const ECS_TITLE = `Installing on ECS cluster`;

const ECSInstallationSteps = ({ apiKey }) => {
    const [serviceName, setServiceName] = useState('');

    return (
        <>
            <InstallationSteps
                apiKey={apiKey}
                title={ECS_TITLE}
                description={ECS_DESCRIPTION_PARAGRAPH}
                stepsData={getECSSteps(apiKey, serviceName, setServiceName)}
            />
            <ServiceDataStatus serviceName={serviceName} />
        </>
    );
};

export default ECSInstallationSteps;
