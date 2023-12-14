{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { useState } from 'react';

import { getSystemdSteps } from '@/utils/installationUtils';

import InstallationSteps from '../InstallationSteps';
import ServiceDataStatus from '../ServiceDataStatus';

const SYSTEMD_DESCRIPTION_PARAGRAPH = `You can generate a systemd service configuration that runs gProfiler as an executable:`;

const SYSTEMD_TITLE = `Installing systemd`;

const SystemdInstallationSteps = ({ apiKey }) => {
    const [serviceName, setServiceName] = useState('');

    return (
        <>
            <InstallationSteps
                title={SYSTEMD_TITLE}
                apiKey={apiKey}
                description={SYSTEMD_DESCRIPTION_PARAGRAPH}
                stepsData={getSystemdSteps(apiKey, serviceName, setServiceName)}
            />
            <ServiceDataStatus serviceName={serviceName} />
        </>
    );
};

export default SystemdInstallationSteps;
