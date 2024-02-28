

import { Typography } from '@mui/material';
import { isEmpty } from 'lodash';

import CopyableParagraph from '@/components/common/dataDisplay/CopyableParagraph';
import Flexbox from '@/components/common/layout/Flexbox';

const SystemdInstallStepContent = ({ apiKey, serviceName }) => {
    const curlCommand = `curl -s https://raw.githubusercontent.com/Granulate/gprofiler/master/deploy/systemd/create_systemd_service.sh | GPROFILER_TOKEN=${apiKey} GPROFILER_SERVICE=${serviceName} bash`;
    const systemctlCommand = `systemctl enable $(pwd)/granulate-gprofiler.service
systemctl start granulate-gprofiler.service`;
    const isParagraphDisabled = isEmpty(serviceName);
    return (
        <Flexbox column spacing={3}>
            <CopyableParagraph disabled={isParagraphDisabled} isCode highlightedButton text={curlCommand} />
            <Typography variant='body1_lato' sx={{ color: 'plainGrey.main' }}>
                This script generates granulate-gprofiler.service in your working directory, you can install it by:
            </Typography>
            <CopyableParagraph disabled={isParagraphDisabled} isCode highlightedButton text={systemctlCommand} />
        </Flexbox>
    );
};

export default SystemdInstallStepContent;
