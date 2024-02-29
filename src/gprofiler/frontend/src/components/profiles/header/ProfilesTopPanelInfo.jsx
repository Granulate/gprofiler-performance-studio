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

import { Tooltip, Typography } from '@mui/material';
import { useContext } from 'react';

import { FgContext } from '../../../states';
import { getPercent } from '../../../utils/fgUtils';

const getTopValuesText = ({ nodeName, currentSamples, totalSamples }) => {
    return `${nodeName} | ${
        currentSamples
            ? `${currentSamples} samples (${getPercent(currentSamples, totalSamples)}% out of ${totalSamples} in total)`
            : `${totalSamples} samples (100% out of ${totalSamples} in total)`
    }`;
};

const ProfilesTopPanelInfo = () => {
    const { zoomedFgData, fgOriginData } = useContext(FgContext);

    return (
        <Tooltip
            title={zoomedFgData?.name || ''}
            placement='bottom-start'
            componentsProps={{ tooltip: { sx: { maxWidth: '80vw' } } }}>
            <Typography
                variant='body1_lato'
                sx={{
                    flexShrink: 1,
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}>
                {getTopValuesText({
                    currentSamples: zoomedFgData?.duration,
                    totalSamples: fgOriginData?.value,
                    nodeName: zoomedFgData?.name,
                })}
            </Typography>
        </Tooltip>
    );
};

export default ProfilesTopPanelInfo;
