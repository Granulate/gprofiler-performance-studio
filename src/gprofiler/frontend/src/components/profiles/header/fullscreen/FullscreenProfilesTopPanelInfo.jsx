

import { Typography } from '@mui/material';
import _ from 'lodash';
import { useContext } from 'react';

import { FgContext, SearchContext } from '@/states';
import { getPercent } from '@/utils/fgUtils';

const getTopValuesText = ({ nodeName, currentSamples, totalSamples }) => {
    return `${nodeName} | ${
        currentSamples
            ? `${currentSamples} samples (${getPercent(currentSamples, totalSamples)}% out of ${totalSamples} in total)`
            : `${totalSamples} samples (100% out of ${totalSamples} in total)`
    }`;
};

const FullScreenProfilesTopPanelInfo = () => {
    const { zoomedFgData, fgOriginData } = useContext(FgContext);
    const { searchResult } = useContext(SearchContext);

    const searchResultInfoText = _.isEqual(searchResult, 'success') ? '' : 'Bad Regex';

    return (
        <Typography variant='body1_lato' sx={{ pl: 4 }}>
            {!_.isNil(searchResult)
                ? searchResultInfoText
                : getTopValuesText({
                      currentSamples: zoomedFgData?.duration,
                      totalSamples: fgOriginData?.value,
                      nodeName: zoomedFgData?.name,
                  })}
        </Typography>
    );
};

export default FullScreenProfilesTopPanelInfo;
