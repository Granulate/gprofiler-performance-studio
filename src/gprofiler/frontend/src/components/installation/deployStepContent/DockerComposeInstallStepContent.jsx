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



import { Link } from '@mui/material';
import { isEmpty } from 'lodash';
import { useState } from 'react';

import { downloadInstallationTemplateFile } from '@/api/downloadInstallationTemplateFile';
import CopyableParagraph from '@/components/common/dataDisplay/CopyableParagraph';
import Flexbox from '@/components/common/layout/Flexbox';

const DockerComposeInstallStepContent = ({ apiKey, serviceName }) => {
    const [isDownloadLoading, setIsDownloadLoading] = useState(false);

    return (
        <Flexbox column spacing={3}>
            {!isEmpty(serviceName) && (
                <Link
                    href='#'
                    loading={isDownloadLoading}
                    onClick={() =>
                        downloadInstallationTemplateFile(
                            serviceName,
                            '',
                            'docker-compose.yml',
                            setIsDownloadLoading,
                            'docker_compose'
                        )
                    }>
                    Download YAML
                </Link>
            )}
            <CopyableParagraph
                disabled={isEmpty(serviceName)}
                isCode
                highlightedButton
                text='docker-compose -f /path/to/docker-compose.yml up -d'
            />
        </Flexbox>
    );
};

export default DockerComposeInstallStepContent;
