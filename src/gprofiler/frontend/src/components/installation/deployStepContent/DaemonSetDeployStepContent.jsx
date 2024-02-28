

import { Box, Link } from '@mui/material';
import { isEmpty } from 'lodash';
import { useState } from 'react';

import { downloadInstallationTemplateFile } from '@/api/downloadInstallationTemplateFile';
import { generateKubectlCommand } from '@/utils/installationUtils';

import CopyableParagraph from '../../common/dataDisplay/CopyableParagraph';
import Flexbox from '../../common/layout/Flexbox';

const prepareCmdString = ({ daemonSetFilename }) => {
    return generateKubectlCommand(daemonSetFilename);
};

const DaemonSetDeployStepContent = ({ serviceName, namespace, daemonSetFilename }) => {
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
                            text={prepareCmdString({ daemonSetFilename })}
                        />
                    </Box>
                </Flexbox>
            </p>
        </div>
    );
};

export default DaemonSetDeployStepContent;
