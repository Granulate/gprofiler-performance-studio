

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
