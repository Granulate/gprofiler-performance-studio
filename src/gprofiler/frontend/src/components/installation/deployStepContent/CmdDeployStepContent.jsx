{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box } from '@mui/material';
import { isEmpty } from 'lodash';
import { useState } from 'react';

import Flexbox from '@/components/common/layout/Flexbox';
import InstallationCheckBox from '@/components/installation/InstallationCheckBox';
import { getServerHostFlag } from '@/utils/installationUtils';

import CopyableParagraph from '../../common/dataDisplay/CopyableParagraph';

const CmdDeployStepContent = ({ apiKey, serviceName, serverHost }) => {
    const [shouldAddNoVerify, setShouldAddNoVerify] = useState(true);
    const deployCommand = `wget -O gprofiler https://github.com/Granulate/gprofiler/releases/latest/download/gprofiler_\`uname -m\`\nsudo chmod +x gprofiler\nsudo TMPDIR=/proc/self/cwd sh -c "setsid ./gprofiler -cu --token='${apiKey}' --service-name='${serviceName}' ${getServerHostFlag(
        serverHost
    )}${shouldAddNoVerify ? ' --no-verify' : ''}> /dev/null 2>&1 &"`;

    const isParagraphDisabled = isEmpty(serviceName);

    return (
        <p className='content-paragraph'>
            <Flexbox column spacing={3}>
                <Box>
                    <CopyableParagraph disabled={isParagraphDisabled} isCode highlightedButton text={deployCommand} />
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

export default CmdDeployStepContent;
