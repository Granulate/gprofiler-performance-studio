{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
