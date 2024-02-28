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



import { Box, RadioGroup, Slider, Typography } from '@mui/material';
import _ from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'react';

import Flexbox from '@/components/common/layout/Flexbox';
import Radio from '@/components/common/selectors/radio/Radio';
import { FgContext, FiltersContext } from '@/states';
import { countFramesByPercentile } from '@/utils/fgUtils';

import { CUSTOM_PERCENTILE_VALUE, THRESHOLD_LIMIT, WEIGHTS_MARKS } from './consts';

const getDisplayValue = (value) => `${value}%`;

const WeightFiltersContainer = ({ hidePresets = false }) => {
    const {
        filters: { weight: weightFilters },
        setWeightThreshold,
        setWeightPercentile,
    } = useContext(FiltersContext);

    const { fgOriginData } = useContext(FgContext);
    const { threshold, percentile, percentiles } = weightFilters;
    const [currentThreshold, setCurrentThreshold] = useState(threshold ? threshold : 0);
    const [currentPercentile, setCurrentPercentile] = useState(percentile ? percentile : 100);
    const showThreshold = hidePresets || currentPercentile === CUSTOM_PERCENTILE_VALUE;

    const frames = useMemo(() => {
        const allFramesSum = countFramesByPercentile(fgOriginData, 100);
        return percentiles.reduce((accumulator, item) => {
            accumulator[item.percentile] = Math.round(allFramesSum * (item.percentile / 100));
            return accumulator;
        }, {});
    }, [fgOriginData, percentiles]);

    useEffect(() => {
        setCurrentThreshold(threshold);
    }, [threshold]);

    useEffect(() => {
        setCurrentPercentile(percentile);
        if (percentile !== 101) {
            setCurrentThreshold(0);
            setWeightThreshold(0);
        }
    }, [percentile, setWeightThreshold]);

    return (
        <Flexbox column sx={{ p: 4 }} spacing={4}>
            <Flexbox column spacing={2}>
                <Typography variant='body2_lato' sx={{ color: 'black.main' }}>
                    Weight range defined filters
                </Typography>

                <RadioGroup
                    name='weight-filter'
                    value={currentPercentile}
                    onChange={(e) => {
                        setCurrentPercentile(Number(e.target.value));
                        if (setWeightPercentile && typeof setWeightPercentile === 'function')
                            setWeightPercentile(Number(e.target.value));
                    }}
                    sx={{ p: 2 }}>
                    {percentiles &&
                        _.isArray(percentiles) &&
                        percentiles.map((item) => {
                            let title = '';
                            if (item.percentile === 100) {
                                title = `All (${frames[item.percentile]} frames)`;
                            } else {
                                title = `P${item.percentile} (${frames[item.percentile]} frames)`;
                            }
                            return <Radio key={item.percentile} value={item.percentile} label={title} />;
                        })}
                    <Radio key={CUSTOM_PERCENTILE_VALUE} value={CUSTOM_PERCENTILE_VALUE} label='Custom' />
                </RadioGroup>
            </Flexbox>

            {showThreshold && (
                <Flexbox column spacing={4}>
                    <Typography variant='body2_lato'>Threshold</Typography>
                    <Box sx={{ px: 5, '& .MuiSlider-markLabel': { typography: 'caption' } }}>
                        <Slider
                            size='small'
                            aria-label='threshold'
                            defaultValue={currentThreshold}
                            getAriaValueText={getDisplayValue}
                            value={currentThreshold}
                            onChange={(e, value) => {
                                setCurrentThreshold(value);
                            }}
                            onChangeCommitted={(e, value) => setWeightThreshold(value)}
                            step={0.1}
                            valueLabelDisplay='auto'
                            marks={WEIGHTS_MARKS}
                            min={0}
                            max={THRESHOLD_LIMIT}
                            track='inverted'
                        />
                    </Box>
                </Flexbox>
            )}
        </Flexbox>
    );
};

export default WeightFiltersContainer;
