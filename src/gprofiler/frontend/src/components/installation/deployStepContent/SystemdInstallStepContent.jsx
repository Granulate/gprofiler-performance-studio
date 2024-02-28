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
