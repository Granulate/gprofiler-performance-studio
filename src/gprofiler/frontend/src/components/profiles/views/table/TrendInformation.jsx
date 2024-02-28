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



import { Box, Typography } from '@mui/material';
import _ from 'lodash';
import PropTypes from 'prop-types';

import Tooltip from '@/components/common/dataDisplay/muiToolTip/Tooltip';
import Icon from '@/components/common/icon/Icon';
import { ICONS_NAMES } from '@/components/common/icon/iconsData';
import Flexbox from '@/components/common/layout/Flexbox';
import { ClockIcon } from '@/svg';
import { COLORS } from '@/theme/colors';

import TrendChart from './TrendChart';

const LITERAL_CONSUMPTION_TRENDS = { lower: 'lower', higher: 'higher', same: 'same' };

const TrendTooltipContent = ({ trendPercentage, lastConsumption, currentConsumption, time, rowId, trendType }) => {
    let literalConsumptionChange = LITERAL_CONSUMPTION_TRENDS.lower;
    if (lastConsumption < currentConsumption) literalConsumptionChange = LITERAL_CONSUMPTION_TRENDS.higher;
    if (lastConsumption == currentConsumption) literalConsumptionChange = LITERAL_CONSUMPTION_TRENDS.same;

    return (
        <Box sx={{ width: 210, variant: 'tooltips.body' }}>
            {!!time && (
                <Flexbox alignItems='center'>
                    <ClockIcon />
                    <Typography sx={{ ml: 2 }}>{time}:</Typography>
                </Flexbox>
            )}
            <Box sx={{ mt: 2 }}>
                {trendType} consumption is <b>{literalConsumptionChange}</b>{' '}
                {literalConsumptionChange === LITERAL_CONSUMPTION_TRENDS.same ? 'as' : 'than'} last week's average by{' '}
                <b>{Math.abs(trendPercentage)}%</b>
            </Box>
            <Flexbox column sx={{ mt: 5, maxWidth: 200 }}>
                <Flexbox column sx={{ width: 'fit-content' }}>
                    <Flexbox alignItems='center' justifyContent='center' spacing={2} sx={{ variant: 'text.strong' }}>
                        {_.includes(_.values(LITERAL_CONSUMPTION_TRENDS), literalConsumptionChange) &&
                            literalConsumptionChange != LITERAL_CONSUMPTION_TRENDS.same && (
                                <Icon
                                    name={ICONS_NAMES.ArrowDown}
                                    color={COLORS.WHITE}
                                    flip={_.isEqual(LITERAL_CONSUMPTION_TRENDS.higher, literalConsumptionChange)}
                                />
                            )}
                        <Typography sx={{ ml: 2 }}>{trendPercentage}%</Typography>
                    </Flexbox>
                    <Box>
                        {LITERAL_CONSUMPTION_TRENDS.higher === literalConsumptionChange && (
                            <TrendChart direction='up' svgPrefix={rowId} />
                        )}
                        {LITERAL_CONSUMPTION_TRENDS.lower === literalConsumptionChange && (
                            <TrendChart direction='down' svgPrefix={rowId} />
                        )}
                    </Box>
                </Flexbox>
                <Flexbox>
                    <Flexbox column>
                        <Box sx={{ variant: 'text.strong' }}>{lastConsumption}%</Box>
                        <Box>Last week</Box>
                    </Flexbox>
                    <Flexbox column>
                        <Box sx={{ variant: 'text.strong' }}>{currentConsumption}%</Box>
                        <Box>Current</Box>
                    </Flexbox>
                </Flexbox>
            </Flexbox>
        </Box>
    );
};

const TrendInformation = ({
    trendPercentage,
    lastConsumption,
    currentConsumption,
    time = null,
    rowId,
    trendType = 'CPU',
}) => {
    const trendPercentageConvert = _.toNumber(trendPercentage) || 0;
    return (
        <Tooltip
            placement='right-start'
            content={
                <TrendTooltipContent
                    trendType={trendType}
                    trendPercentage={trendPercentageConvert}
                    lastConsumption={lastConsumption}
                    currentConsumption={currentConsumption}
                    time={time}
                    rowId={rowId}
                />
            }>
            <Box>
                <Flexbox alignItems='center' spacing={1}>
                    {trendPercentageConvert !== 0 && (
                        <Icon
                            name={ICONS_NAMES.ArrowDown}
                            flip={trendPercentageConvert > 0}
                            color={trendPercentageConvert < 0 ? COLORS.ERROR_RED : COLORS.SUCCESS_GREEN}
                        />
                    )}
                    <span>{Math.abs(trendPercentageConvert)}%</span>
                </Flexbox>
            </Box>
        </Tooltip>
    );
};

TrendInformation.propTypes = {
    lastConsumption: PropTypes.number.isRequired,
    currentConsumption: PropTypes.number.isRequired,
    date: PropTypes.string,
    trendPercentage: PropTypes.number.isRequired,
    rowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default TrendInformation;
