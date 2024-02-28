

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
