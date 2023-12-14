{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box } from '@mui/material';
import { isEmpty } from 'lodash';
import { useState } from 'react';

import CopyableParagraph from '@/components/common/dataDisplay/CopyableParagraph';
import Flexbox from '@/components/common/layout/Flexbox';
import InstallationCheckBox from '@/components/installation/InstallationCheckBox';
import { getServerHostFlag } from '@/utils/installationUtils';

const DockerDeployStepContent = ({ apiKey, serviceName, serverHost }) => {
    const [shouldAddNoVerify, setShouldAddNoVerify] = useState(true);
    const deployCommand = `docker pull granulate/gprofiler:latest\ndocker run --name granulate-gprofiler --restart=always -d --pid=host --userns=host --privileged granulate/gprofiler:latest -cu --token="${apiKey}" --service-name="${serviceName}" ${getServerHostFlag(
        serverHost
    )}${shouldAddNoVerify ? ' --no-verify' : ''}`;

    return (
        <p className='content-paragraph'>
            <Flexbox column spacing={3}>
                <Box>
                    <CopyableParagraph disabled={isEmpty(serviceName)} isCode highlightedButton text={deployCommand} />
                </Box>
                <InstallationCheckBox
                    enableText={'Include skip verification flag for SSL certificate'}
                    isChecked={shouldAddNoVerify}
                    setIsChecked={setShouldAddNoVerify}
                />
            </Flexbox>
        </p>
    );
};

export default DockerDeployStepContent;
