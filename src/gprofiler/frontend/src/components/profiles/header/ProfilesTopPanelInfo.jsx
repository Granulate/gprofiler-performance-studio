

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
