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
