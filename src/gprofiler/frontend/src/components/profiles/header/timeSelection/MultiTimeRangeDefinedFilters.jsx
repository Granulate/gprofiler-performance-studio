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



import { Box, RadioGroup, Typography } from '@mui/material';
import _ from 'lodash';

import Flexbox from '@/components/common/layout/Flexbox';
import Radio from '@/components/common/selectors/radio/Radio';
import { COLORS } from '@/theme/colors';
import { TIME_RANGE_FILTERS } from '@/utils/fgUtils';

const TimeRangeDefinedFilters = ({ timeRangeType, setTimeRangeType, setStartTime, setEndTime }) => {
    return (
        <Box sx={{ pl: 3 }}>
            <Typography variant='body2_lato' sx={{ color: COLORS.BLACK, pb: 3 }}>
                Time range defined filters
            </Typography>
            <RadioGroup
                sx={{ p: 2 }}
                value={timeRangeType}
                onChange={(e) => {
                    setTimeRangeType(e.target.value);
                    if (e.target.value !== 'custom') {
                        setStartTime('');
                        setEndTime('');
                    }
                }}>
                <Flexbox spacing={4}>
                    {_.map(_.chunk(TIME_RANGE_FILTERS, 2), (timeRange, index) => (
                        <Flexbox column key={index}>
                            <Radio key={timeRange[0]?.id} value={timeRange[0]?.id} label={timeRange[0]?.text} />

                            {_.size(timeRange) > 1 && (
                                <Radio key={timeRange[1]?.id} value={timeRange[1]?.id} label={timeRange[1]?.text} />
                            )}
                        </Flexbox>
                    ))}
                </Flexbox>
            </RadioGroup>
        </Box>
    );
};

export default TimeRangeDefinedFilters;
