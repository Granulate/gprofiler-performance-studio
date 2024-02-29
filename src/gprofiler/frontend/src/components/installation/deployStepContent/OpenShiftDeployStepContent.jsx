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

import { Box, Link } from '@mui/material';
import { isEmpty } from 'lodash';
import { useState } from 'react';

import { downloadInstallationTemplateFile } from '../../../api/downloadInstallationTemplateFile';
import CopyableParagraph from '../../common/dataDisplay/CopyableParagraph';
import Flexbox from '../../common/layout/Flexbox';

const OpenShiftDeployStepContent = ({ serviceName, namespace, daemonSetFilename }) => {
    const [isDownloadLoading, setIsDownloadLoading] = useState(false);
    const isMetaDataExists = !isEmpty(serviceName) && !isEmpty(namespace);

    return (
        <div>
            {isMetaDataExists && (
                <Link
                    href='#'
                    loading={isDownloadLoading}
                    onClick={() =>
                        downloadInstallationTemplateFile(
                            serviceName,
                            namespace,
                            daemonSetFilename,
                            setIsDownloadLoading
                        )
                    }>
                    Download DaemonSet YAML
                </Link>
            )}
            <p className='content-paragraph'>
                <Flexbox column spacing={3}>
                    <Box>On the cluster you would like to profile, run:</Box>
                    <Box>
                        <CopyableParagraph
                            disabled={!isMetaDataExists}
                            isCode
                            highlightedButton
                            text={`oc apply -f gProfilerDaemonSet.yml`}
                        />
                    </Box>
                </Flexbox>
            </p>
        </div>
    );
};

export default OpenShiftDeployStepContent;
