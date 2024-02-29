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

import { Link } from '@mui/material';
import { useState } from 'react';

import { downloadInstallationTemplateFile } from '../../../api/downloadInstallationTemplateFile';
import { COLORS } from '../../../theme/colors';
import Icon from '../../common/icon/Icon';
import { ICONS_NAMES } from '../../common/icon/iconsData';
import Flexbox from '../../common/layout/Flexbox';

const ECSDownloadTaskStepContent = ({ apiKey, serviceName, daemonSetFilename }) => {
    const [isDownloadLoading, setIsDownloadLoading] = useState(false);
    return apiKey && serviceName ? (
        <Link
            href='#'
            onClick={() =>
                downloadInstallationTemplateFile(serviceName, null, daemonSetFilename, setIsDownloadLoading, 'ecs')
            }
            loading={isDownloadLoading}>
            <Flexbox justifyContent='flex-start'>
                <Flexbox flex='0 0 auto'>
                    <Icon name={ICONS_NAMES.Download} size={22} color={COLORS.PRIMARY_PURPLE} />
                </Flexbox>
                <strong>Task definition JSON</strong>
            </Flexbox>
        </Link>
    ) : (
        <></>
    );
};

export default ECSDownloadTaskStepContent;
