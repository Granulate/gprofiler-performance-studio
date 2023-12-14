{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, Typography } from '@mui/material';
import _ from 'lodash';
import { useContext, useMemo, useState } from 'react';

import { SelectorsContext } from '@/states';

import useGetApiKey from '../../api/hooks/useGetApiKey';
import useGetServicesList from '../../api/hooks/useGetServicesList';
import WelcomeToTourModal from '../common/dataDisplay/modal/WelcomeToTourModal';
import Error from '../common/feedback/Error';
import Loader from '../common/feedback/Loader';
import Icon from '../common/icon/Icon';
import { ICONS_NAMES } from '../common/icon/iconsData';
import Flexbox from '../common/layout/Flexbox';
import PageHeader from '../common/layout/PageHeader';
import InstallationMenu from './InstallationMenu';
import CmdInstallationSteps from './steps/CmdInstallationSteps';
import DockerInstallationSteps from './steps/DockerInstallationSteps';

// import DockerComposeIcon from '../../img/docker-compose.png';
// import DockerComposeInstallationSteps from './steps/DockerComposeInstallationSteps';
// import AnsibleIcon from '../../img/Ansible.png';
// import DataprocIcon from '../../img/dataproc.png';
// import ECSIcon from '../../img/ECS.png';
// import EMRIcon from '../../img/EMR.png';
// import SystemdIcon from '../../img/Systemd.png';
// import { OpenShiftIcon } from '../common/icon/svgIcons';
// import DaemonSetInstallationSteps from './steps/DaemonSetInstallationSteps';
// import DatabricksInstallationSteps from './steps/DatabricksInstallationSteps';
// import DataprocInstallationSteps from './steps/DataprocInstallationSteps';
// import SystemdInstallationSteps from './deployStepContent/SystemdInstallationSteps';
// import AnsibleInstallationSteps from './steps/AnsibleInstallationSteps';
// import ECSInstallationSteps from './steps/ECSInstallationSteps';
// import EMRInstallationSteps from './steps/EMRInstallationSteps';
// import OpenShiftInstallationSteps from './steps/OpenShiftInstallationSteps';

const FULL_INSTALLATION_TABS = [
    {
        name: 'Docker',
        key: 'docker',
        icon: <Icon name={ICONS_NAMES.Docker} marginRight={10} size={25} color={'#2495EC'} />,
        content: (props) => <DockerInstallationSteps {...props} />,
    },
    {
        name: 'Command line',
        key: 'cmd',
        icon: <Icon name={ICONS_NAMES.CommandLine} margin={2} marginRight={10} />,
        content: (props) => <CmdInstallationSteps {...props} />,
    },
    // {
    //     name: 'Docker Compose',
    //     key: 'dockerCompose',
    //     icon: (
    //         <Box
    //             sx={{ mr: 3, ml: 1 }}
    //             component='img'
    //             alt='DOCKERCOMPOSE'
    //             width={21}
    //             height={19}
    //             src={DockerComposeIcon}
    //         />
    //     ),
    //     content: (props) => <DockerComposeInstallationSteps {...props} />,
    // },
    // {
    //     name: 'Kubernetes',
    //     key: 'daemonset',
    //     icon: <Icon name={ICONS_NAMES.Kubernetes} marginRight={10} size={25} color={'#3970e4'} />,
    //     content: (props) => <DaemonSetInstallationSteps {...props} />,
    // },
    // {
    //     name: 'OpenShift',
    //     key: 'daemonsetOpenshift',
    //     icon: <OpenShiftIcon sx={{ m: 2, mr: 4 }} fontSize='small' />,
    //     content: (props) => <OpenShiftInstallationSteps {...props} />,
    // },

    // {
    //     name: 'AWS ECS',
    //     key: 'ecs',
    //     icon: <Box sx={{ mr: 3, ml: 1 }} component='img' alt='ECS' width={21} height={19} src={ECSIcon} />,
    //     content: (props) => <ECSInstallationSteps {...props} />,
    // },
    //     {
    //     name: 'AWS EMR',
    //     key: 'emr',
    //     icon: <Box sx={{ mr: 3, ml: 1 }} component='img' alt='EMR' width={21} height={19} src={EMRIcon} />,
    //     content: (props) => <EMRInstallationSteps {...props} />,
    // },
    // {
    //     name: 'Databricks',
    //     key: 'databricks',
    //     icon: <Icon name={ICONS_NAMES.DataBricks} color={'#FF3621'} margin={2} marginRight={10} />,
    //     content: (props) => <DatabricksInstallationSteps {...props} />,
    // },
    // {
    //     name: 'Ansible',
    //     key: 'ansible',
    //     icon: <Box sx={{ mr: 3, ml: 1 }} component='img' alt='ANSIBLE' width={21} height={19} src={AnsibleIcon} />,
    //     content: (props) => <AnsibleInstallationSteps {...props} />,
    // },
    // {
    //     name: 'Systemd',
    //     key: 'systemd',
    //     icon: <Box sx={{ mr: 3, ml: 1 }} component='img' alt='SYSTEMD' width={21} height={19} src={SystemdIcon} />,
    //     content: (props) => <SystemdInstallationSteps {...props} />,
    // },
    // {
    //     name: 'Dataproc',
    //     key: 'dataproc',
    //     icon: <Box sx={{ mr: 3, ml: 1 }} component='img' alt='DATAPROC' width={21} height={19} src={DataprocIcon} />,
    //     content: (props) => <DataprocInstallationSteps {...props} />,
    // },
];

const InstallationPage = () => {
    const [selectedTab, setSelectedTab] = useState(FULL_INSTALLATION_TABS[0]);
    const { services, areServicesLoading } = useContext(SelectorsContext);

    useGetServicesList({});
    const { apiKey, isApiKeyLoading, error } = useGetApiKey();

    const isFetchingData = useMemo(() => isApiKeyLoading || areServicesLoading, [isApiKeyLoading, areServicesLoading]);

    const onTabClick = (index) => {
        setSelectedTab(FULL_INSTALLATION_TABS[index]);
    };

    return error ? (
        <Error title='Error getting api token' message={error.message} />
    ) : (
        <>
            {!isFetchingData && _.isEmpty(services) && <WelcomeToTourModal />}
            <PageHeader title='Getting Started' />
            <Flexbox sx={{ m: 8 }} spacing={8}>
                <Box>
                    <Typography variant='subtitle1_lato'>Installation Methods</Typography>
                    <InstallationMenu
                        onClick={onTabClick}
                        options={FULL_INSTALLATION_TABS}
                        selectedKey={selectedTab.key}
                        disabled={isFetchingData}
                    />
                </Box>
                <Box sx={{ width: '100%', backgroundColor: 'white.main', padding: 8, borderRadius: 1 }}>
                    {isFetchingData ? <Loader /> : selectedTab.content({ apiKey })}
                </Box>
            </Flexbox>
        </>
    );
};

export default InstallationPage;
