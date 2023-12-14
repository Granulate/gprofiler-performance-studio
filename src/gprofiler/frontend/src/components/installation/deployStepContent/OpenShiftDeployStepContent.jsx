{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
