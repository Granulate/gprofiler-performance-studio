{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, Link, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { useState } from 'react';

import { downloadInstallationTemplateFile } from '../../../api/downloadInstallationTemplateFile';
import CopyableParagraph from '../../common/dataDisplay/CopyableParagraph';
import Flexbox from '../../common/layout/Flexbox';

const AnsibleDeployStepContent = ({ serviceName, fileName, apiKey }) => {
    const [isDownloadLoading, setIsDownloadLoading] = useState(false);

    const isMetaDataExists = !isEmpty(serviceName);

    return (
        <Flexbox column>
            {isMetaDataExists && (
                <Link
                    href='#'
                    loading={isDownloadLoading}
                    onClick={() =>
                        downloadInstallationTemplateFile(serviceName, '', fileName, setIsDownloadLoading, 'ansible')
                    }>
                    Download the playbook
                </Link>
            )}
            <Flexbox column spacing={3}>
                <Box>
                    <CopyableParagraph
                        disabled={!isMetaDataExists}
                        isCode
                        highlightedButton
                        text={`ansible-playbook -i ... gprofiler_playbook.yml --extra-vars "gprofiler_token='${apiKey}'" --extra-vars "gprofiler_service='${serviceName}'"`}
                    />
                </Box>
                <Typography variant='body1_lato' sx={{ color: 'plainGrey.dark' }}>
                    <b>Note</b> - the playbook defaults to hosts: all, make sure to modify the pattern to your liking
                    before running.
                </Typography>
                <Typography variant='body1_lato' sx={{ color: 'plainGrey.main', wordWrap: 'break-word' }}>
                    The playbook defines 2 more variables: <br />
                    gprofiler_path - path to download gProfiler to, the path is /tmp/gprofiler by default. <br />
                    gprofiler_args - additional arguments to pass to gProfiler, empty by default. You can use it to
                    pass, for example, '--profiling-frequency 15' to change the frequency.
                </Typography>
            </Flexbox>
        </Flexbox>
    );
};

export default AnsibleDeployStepContent;
