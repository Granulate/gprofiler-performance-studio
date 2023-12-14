{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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