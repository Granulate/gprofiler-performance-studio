{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
