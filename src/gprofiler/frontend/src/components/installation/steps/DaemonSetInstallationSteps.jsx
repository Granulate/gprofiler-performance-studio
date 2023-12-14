{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
