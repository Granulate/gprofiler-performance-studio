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
