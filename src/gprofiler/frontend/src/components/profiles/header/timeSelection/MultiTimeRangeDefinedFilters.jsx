

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
