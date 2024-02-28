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
