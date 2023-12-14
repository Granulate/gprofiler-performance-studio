{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
