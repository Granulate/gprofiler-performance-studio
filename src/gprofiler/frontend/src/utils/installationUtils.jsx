{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Checkbox, FormControlLabel, Link } from '@mui/material';
import { concat, includes } from 'lodash';

import Flexbox from '@/components/common/layout/Flexbox';
import AnsibleDeployStepContent from '@/components/installation/deployStepContent/AnsibleDeployStepContent';
import DockerComposeInstallStepContent from '@/components/installation/deployStepContent/DockerComposeInstallStepContent';
import SystemdInstallStepContent from '@/components/installation/deployStepContent/SystemdInstallStepContent';

import CopyableParagraph from '../components/common/dataDisplay/CopyableParagraph';
import CmdDeployStepContent from '../components/installation/deployStepContent/CmdDeployStepContent';
import DaemonSetDeployStepContent from '../components/installation/deployStepContent/DaemonSetDeployStepContent';
import DatabricksDeployStepContent from '../components/installation/deployStepContent/DatabricksDeployStepContent';
import DockerDeployStepContent from '../components/installation/deployStepContent/DockerDeployStepContent';
import ECSDeployStepContent from '../components/installation/deployStepContent/ECSDeployStepContent';
import ECSDeployStepTitle from '../components/installation/deployStepContent/ECSDeployStepTitle';
import ECSDownloadTaskStepContent from '../components/installation/deployStepContent/ECSDownloadTaskStepContent';
import EMRDeployTabs from '../components/installation/deployStepContent/EMRTabsWrapper';
import OpenShiftDeployStepContent from '../components/installation/deployStepContent/OpenShiftDeployStepContent';
import InstallationTextStepForm from '../components/installation/InstallationTextStepForm';
import ServiceNameForm from '../components/installation/ServiceNameForm';

const containerLogsOutput = `[05:41:37] Running gprofiler (version 0.0.7)...
[05:41:37] Kernel uname release: 4.15.0-58-generic
[05:41:37] Kernel uname version: #64-Ubuntu SMP Tue Aug 6 11:12:41 UTC 2019
[05:41:37] Total CPUs: 1
[05:41:37] Total RAM: 0.96 GB
[05:41:37] Linux distribution: ('Ubuntu', '18.04', 'bionic')
[05:41:37] libc version: ('glibc', b'2.27-3ubuntu1')
[05:41:38] The connection to the server was successfully established
[05:41:38] gProfiler initialized and ready to start profiling`;

// Functions for getting steps' data for each tab
const getDockerSteps = (apiKey, dockerServiceName, setDockerServiceName, serverHost, setServerHost) => {
    const dockerDeployDescription =
        'Run the following command on each node in the service you would like to profile continuously';
    let dockerStepsList = [getServiceNameStep(dockerServiceName, setDockerServiceName)];

    dockerStepsList = concat(dockerStepsList, getServerHostStep(serverHost, setServerHost));

    return concat(dockerStepsList, [
        getDeployStep(
            dockerDeployDescription,
            <DockerDeployStepContent apiKey={apiKey} serviceName={dockerServiceName} serverHost={serverHost} />,
            true
        ),
        getUnderstandStep(),
    ]);
};

const getOpenShiftSteps = (apiKey, dsServiceName, setDsServiceName, dsNamespace, setDsNamespace) => {
    const daemonSetFilename = 'gProfilerDaemonSet.yml';
    return [
        getServiceNameStep(dsServiceName, setDsServiceName),
        getNameSpaceStep(dsNamespace, setDsNamespace),
        getDeployStep(
            '',
            <OpenShiftDeployStepContent
                serviceName={dsServiceName}
                namespace={dsNamespace}
                containerLogsOutput={containerLogsOutput}
                daemonSetFilename={daemonSetFilename}
                apiKey={apiKey}
            />
        ),
        getUnderstandStep(),
    ];
};

export const generateKubectlCommand = (filename) => `kubectl apply -f ${filename}`;

const getDaemonSetSteps = (apiKey, dsServiceName, setDsServiceName, dsNamespace, setDsNamespace) => {
    const daemonSetFilename = 'gProfilerDaemonSet.yml';
    return [
        getServiceNameStep(dsServiceName, setDsServiceName),
        getNameSpaceStep(dsNamespace, setDsNamespace),
        getDeployStep(
            '',
            <DaemonSetDeployStepContent
                serviceName={dsServiceName}
                namespace={dsNamespace}
                containerLogsOutput={containerLogsOutput}
                daemonSetFilename={daemonSetFilename}
                apiKey={apiKey}
            />
        ),
        getUnderstandStep(),
    ];
};

export const getECSSteps = (apiKey, serviceName, setECSServiceName) => {
    const daemonSetFilename = 'gprofiler_task_definition.json';
    return [
        getServiceNameStep(serviceName, setECSServiceName),
        {
            title: <>Download task definition</>,
            content: (
                <ECSDownloadTaskStepContent
                    apiKey={apiKey}
                    serviceName={serviceName}
                    daemonSetFilename={daemonSetFilename}
                />
            ),
        },
        {
            title: <ECSDeployStepTitle />,
            content: <ECSDeployStepContent />,
        },
        getUnderstandStep(),
    ];
};

export const getEMRSteps = (apiKey, serviceName, setEMRServiceName) => {
    return [
        getServiceNameStep(serviceName, setEMRServiceName, false),
        {
            content: <EMRDeployTabs apiKey={apiKey} serviceName={serviceName} />,
        },
        getUnderstandStep(),
    ];
};

export const getAnsibleSteps = (apiKey, serviceName, setAnsibleServiceName) => {
    return [
        getServiceNameStep(serviceName, setAnsibleServiceName),
        {
            content: (
                <AnsibleDeployStepContent
                    fileName={'gprofiler-playbook.yml'}
                    apiKey={apiKey}
                    serviceName={serviceName}
                />
            ),
            title: 'Deploy gProfiler',
            description: 'Run the playbook against all nodes you wish to install gProfiler on.',
        },
        getUnderstandStep(),
    ];
};

export const getSystemdSteps = (apiKey, serviceName, setServiceName) => {
    return [
        getServiceNameStep(serviceName, setServiceName),
        {
            content: <SystemdInstallStepContent apiKey={apiKey} serviceName={serviceName} />,
            title: 'Install gProfiler',
            description:
                'Run the following command on each node in the service you would like to profile continuously.',
        },
        getUnderstandStep(),
    ];
};

const getCommandLineSteps = (apiKey, cmdServiceName, setCmdServiceName, serverHost, setServerHost) => {
    const cmdDeployDescription = (
        <div>
            Run the following command on each node in the service you would like to profile continuously,
            <b> this installation also supports big data workloads</b>
        </div>
    );
    let cmdStepsList = [getServiceNameStep(cmdServiceName, setCmdServiceName)];

    cmdStepsList = concat(cmdStepsList, getServerHostStep(serverHost, setServerHost));

    return concat(cmdStepsList, [
        getDeployStep(
            cmdDeployDescription,
            <CmdDeployStepContent apiKey={apiKey} serviceName={cmdServiceName} serverHost={serverHost} />
        ),
        getUnderstandStep(),
    ]);
};

const getDatabricksSteps = (apiKey, cmdServiceName, setCmdServiceName, shouldUseJobName, setShouldUseJobName) => {
    const databricksDeployDescription = (
        <div>Run the following command on each node in the service you would like to profile continuously.</div>
    );
    return [
        getServiceNameStep(cmdServiceName, setCmdServiceName, shouldUseJobName, {
            helperComponent: FormControlLabel,
            helperComponentProps: {
                control: <Checkbox sx={{ mt: 2 }} onChange={setShouldUseJobName} value={shouldUseJobName} />,
                label: 'In ephemeral Databricks clusters (AKA Job clusters) use job name as service name',
            },
        }),
        getDeployStep(
            databricksDeployDescription,
            <DatabricksDeployStepContent
                apiKey={apiKey}
                serviceName={cmdServiceName}
                shouldUseJobName={shouldUseJobName}
            />
        ),
        getUnderstandStep(),
    ];
};

export const getDataprocSteps = ({
    apiKey,
    serviceName,
    setServiceName,
    clusterName,
    setClusterName,
    bucketName,
    setBucketName,
    region,
    setRegion,
}) => {
    return [
        getServiceNameStep(serviceName, setServiceName, false),
        {
            title: 'Choose Cluster name',
            content: (
                <InstallationTextStepForm
                    value={clusterName}
                    onChange={(e) => setClusterName(e.target.value)}
                    placeholder='Cluster name'
                />
            ),
        },
        {
            title: 'Choose the bucket name',
            content: (
                <InstallationTextStepForm
                    value={bucketName}
                    onChange={(e) => setBucketName(e.target.value)}
                    placeholder='Bucket name'
                />
            ),
        },
        {
            title: 'Region',
            content: (
                <InstallationTextStepForm
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder='Region'
                />
            ),
        },
        {
            title: (
                <>
                    Upload gProfiler{' '}
                    <Link
                        sx={{ color: 'black.main' }}
                        target='_blank'
                        href='https://github.com/Granulate/gprofiler/blob/master/deploy/dataproc/gprofiler_initialization_action.sh'>
                        initialization action script
                    </Link>
                </>
            ),
            description: (
                <>
                    If you don't have a Google Storage bucket, make sure you create one (
                    <Link
                        sx={{ color: 'plainGrey.main' }}
                        target='_blank'
                        href='https://cloud.google.com/storage/docs/creating-buckets'>
                        documentation
                    </Link>
                    )
                </>
            ),
            content: (
                <CopyableParagraph isCode text={`gsutil cp gprofiler_initialization_action.sh gs://${bucketName}`} />
            ),
        },
        {
            title: 'Deploy gProfiler ',
            description: `Run the following command on each node in the service you would like to profile continuously`,
            content: (
                <Flexbox column spacing={3}>
                    <CopyableParagraph
                        isCode
                        text={`gcloud dataproc clusters create ${clusterName} --region="${region}" --initialization-actions gs://${bucketName}/gprofiler_initialization_action.sh --metadata gprofiler-token="${apiKey}",gprofiler-service="${serviceName}",enable-stdout="1"`}
                    />
                </Flexbox>
            ),
        },
        getUnderstandStep(),
    ];
};

export const getDockerComposeSteps = ({ apiKey, serviceName, setServiceName }) => {
    return [
        getServiceNameStep(serviceName, setServiceName),
        {
            title: 'Deploy gProfiler ',
            description: 'Run the following command on each node in the service you would like to run continuously',
            content: <DockerComposeInstallStepContent serviceName={serviceName} apiKey={apiKey} />,
        },
        getUnderstandStep(),
    ];
};

//Functions for getting step's data by step type
export const getApiKeyStep = (apiKey) => {
    return { title: 'User unique API key', content: <CopyableParagraph isCode text={apiKey} /> };
};

const getServiceNameStep = (serviceName, setServiceName, disabled, helperComponentData) => {
    return {
        title: 'Please choose a service name',
        description: 'The service name will be used to aggregate and tag the profiling data collected',
        warning:
            'Adding a new node to an existing  service will aggregate the information from all nodes to a unified view of the service',
        content: (
            <ServiceNameForm
                disabled={disabled}
                serviceName={serviceName}
                setServiceName={setServiceName}
                {...helperComponentData}
            />
        ),
    };
};

const getNameSpaceStep = (namespace, setNamespace) => {
    return {
        title: 'Add namespace',
        description:
            'This is the namespace to use for the DaemonSet. Note that gProfiler profiles all Pods on the nodes it runs on, not only Pods of this namespace.',
        content: (
            <InstallationTextStepForm
                value={namespace}
                onChange={(value) => setNamespace(value.target.value)}
                placeholder='Namespace'
            />
        ),
    };
};

const getServerHostStep = (serverHost, setServerHost) => {
    return {
        title: 'Choose Server Host',
        content: (
            <InstallationTextStepForm
                value={serverHost}
                onChange={(value) => setServerHost(value.target.value)}
                placeholder='Server host'
            />
        ),
    };
};

const getDeployStep = (description, content, isContainer = false) => {
    return {
        title: `Deploy gProfiler${isContainer ? ' container' : ''}`,
        description,
        content,
    };
};

const getUnderstandStep = () => {
    return {
        title: 'Understand code performance in production',
        description: 'Once we receive profiling data, the service will be added to your services list',
    };
};

const getServerHostFlag = (serverHost) => {
    if (serverHost) {
        return `--server-host "${serverHost}" --glogger-server "${serverHost}"`;
    }
    return '';
};

export {
    getCommandLineSteps,
    getDaemonSetSteps,
    getDatabricksSteps,
    getDockerSteps,
    getOpenShiftSteps,
    getServerHostFlag,
};
