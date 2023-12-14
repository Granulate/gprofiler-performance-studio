{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
