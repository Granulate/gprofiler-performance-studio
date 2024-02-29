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
