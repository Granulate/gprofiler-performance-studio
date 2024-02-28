

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
