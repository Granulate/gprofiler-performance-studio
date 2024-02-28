{/*
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
