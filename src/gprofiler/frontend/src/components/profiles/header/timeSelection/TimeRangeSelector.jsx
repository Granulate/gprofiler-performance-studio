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

import { Box, CircularProgress } from '@mui/material';
import _ from 'lodash';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import useGetDatesTimesWithData from '@/api/hooks/useGetDatesTimesWithData';
import Button from '@/components/common/button/Button';
import Flexbox from '@/components/common/layout/Flexbox';
import Dropdown from '@/components/common/selectors/dropdown/Dropdown';
import DateTimeRangePicker from '@/components/common/selectors/pickers/dateTimeRangePicker/DateTimeRangePicker';
import { FiltersContext, SearchContext, SelectorsContext } from '@/states';
import { TimeIcon } from '@/svg/topPanelIcons';
import { addTime, parseUtcStringToDate, parseUtcToLocalDateTime, subDate, TIME_UNITS } from '@/utils/datetimesUtils';
import {
    CUSTOM_TIME_KEY,
    DEFAULT_INITIAL_TIME_RANGE_FILTER,
    getTimeRangeText,
    LAST_SNAPSHOT_TIME_KEY,
    TIME_RANGE_FILTERS,
} from '@/utils/fgUtils';

import MultiTimeRangeDefinedFilters from './MultiTimeRangeDefinedFilters';

const findTimeKey = (timeSelection) => {
    return timeSelection?.customTime
        ? CUSTOM_TIME_KEY
        : timeSelection?.relativeTime || DEFAULT_INITIAL_TIME_RANGE_FILTER;
};

const TimeRangeSelector = ({
    disabled = false,
    // isCustom together with customTimeSelection and setCustomTimeSelection are props to send to the selector
    // when we wish it to not connect and change values from the context, but to receive and change values received by the parent.
    isCustom = false,
    customTimeSelection = undefined,
    setCustomTimeSelection = undefined,
    dropDownAlign = 'bottom-end',
}) => {
    const { selectedService, timeSelection, setTimeSelection, resetSelectedTimeRange } = useContext(SelectorsContext);
    const { resetProcessFilters, resetRuntimeFilters, resetWeightFilters } = useContext(FiltersContext);
    const { setSearchValue } = useContext(SearchContext);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [numberOfRenders, setNumberOfRenders] = useState(0);
    const [isTimeRangeSelectOpen, setIsTimeRangeSelectOpen] = useState(false);

    const [timeRangeType, setTimeRangeType] = useState(
        isCustom ? findTimeKey(customTimeSelection) : findTimeKey(timeSelection)
    );

    const { loading, datetimes } = useGetDatesTimesWithData(timeRangeType);

    // this resets all filters on service or client change.
    const resetFilters = useCallback(() => {
        if (selectedService) {
            // prevents resetting on loading the page with query params in url
            if (numberOfRenders > 1) {
                resetRuntimeFilters();
                resetProcessFilters();
                resetWeightFilters();
                setSearchValue('');
            }
            setNumberOfRenders(numberOfRenders + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selectedService,
        resetSelectedTimeRange,
        resetRuntimeFilters,
        resetProcessFilters,
        resetWeightFilters,
        setSearchValue,
    ]);

    useEffect(() => {
        resetFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedService]);

    useEffect(() => {
        setTimeRangeType(isCustom ? findTimeKey(customTimeSelection) : findTimeKey(timeSelection));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCustom ? customTimeSelection : timeSelection]);

    const isTimeTypeRelative = useMemo(() => timeRangeType !== CUSTOM_TIME_KEY, [timeRangeType]);
    const isLastSnapshotSelected = useMemo(() => timeRangeType === LAST_SNAPSHOT_TIME_KEY, [timeRangeType]);

    const utcLastDateWithData = datetimes?.lastDateTime;
    const lastDateWithData = utcLastDateWithData ? parseUtcStringToDate(utcLastDateWithData) : new Date();

    const startDefaultValue = _.max([subDate(lastDateWithData, TIME_UNITS.hours, 1), startTime]) || lastDateWithData;

    const handleApply = () => {
        if (timeRangeType === LAST_SNAPSHOT_TIME_KEY && !_.isEmpty(datetimes)) {
            const utcLastDateWithData = datetimes?.lastDateTime;
            let lastDateWithData = utcLastDateWithData ? parseUtcStringToDate(utcLastDateWithData) : undefined;
            const endTime = lastDateWithData;
            const startTime = addTime(lastDateWithData, TIME_UNITS.days, -1);
            setStartTime(startTime);
            setEndTime(endTime);
            setIsTimeRangeSelectOpen(false);
            if (!isCustom) {
                setTimeSelection({
                    customTime: { startTime, endTime },
                });
            } else {
                setCustomTimeSelection({ customTime: { startTime, endTime } });
            }
        } else {
            if (!isTimeTypeRelative) {
                if (isCustom) {
                    setCustomTimeSelection({
                        customTime: { startTime: startTime || startDefaultValue, endTime: endTime || lastDateWithData },
                    });
                } else {
                    setTimeSelection({
                        customTime: { startTime: startTime || startDefaultValue, endTime: endTime || lastDateWithData },
                    });
                }
            } else {
                if (isCustom) {
                    setCustomTimeSelection({ relativeTime: timeRangeType });
                } else {
                    setTimeSelection({ relativeTime: timeRangeType });
                }
            }
            setIsTimeRangeSelectOpen(false);
        }
    };

    const onDateRangeChange = (value) => {
        const { startDate, endDate } = value;
        setStartTime(startDate);
        setEndTime(endDate);
    };

    return (
        <Dropdown
            placement={dropDownAlign}
            customWidth='700px'
            title={
                isCustom
                    ? customTimeSelection?.relativeTime
                        ? getTimeRangeText(TIME_RANGE_FILTERS, customTimeSelection?.relativeTime)
                        : parseUtcToLocalDateTime(
                              customTimeSelection?.customTime?.startTime,
                              customTimeSelection?.customTime?.endTime
                          )
                    : timeSelection?.relativeTime
                    ? getTimeRangeText(TIME_RANGE_FILTERS, timeSelection?.relativeTime)
                    : parseUtcToLocalDateTime(timeSelection?.customTime?.startTime, timeSelection?.customTime?.endTime)
            }
            icon={<TimeIcon />}
            disabled={disabled}
            open={isTimeRangeSelectOpen}
            setOpen={setIsTimeRangeSelectOpen}>
            <Flexbox column sx={{ p: 4, width: '100%' }}>
                <Flexbox column sx={{ pb: 3, borderBottom: 'separator' }}>
                    <MultiTimeRangeDefinedFilters
                        timeRangeType={timeRangeType}
                        setTimeRangeType={setTimeRangeType}
                        setStartTime={setStartTime}
                        setEndTime={setEndTime}
                    />
                    {!isTimeTypeRelative && (
                        <Box sx={{ p: 3, justifyContent: 'center', m: 'auto', maxWidth: '100%' }}>
                            {loading ? (
                                <CircularProgress size={20} />
                            ) : (
                                <DateTimeRangePicker
                                    onChange={onDateRangeChange}
                                    startValueOnPicker={
                                        startTime ||
                                        (isCustom
                                            ? customTimeSelection?.customTime?.startTime
                                            : timeSelection?.customTime?.startTime) ||
                                        startDefaultValue
                                    }
                                    endValueOnPicker={
                                        endTime ||
                                        (isCustom
                                            ? customTimeSelection?.customTime?.endTime
                                            : timeSelection?.customTime?.endTime) ||
                                        lastDateWithData
                                    }
                                />
                            )}
                        </Box>
                    )}
                </Flexbox>
                <Flexbox justifyContent='flex-end' sx={{ pt: 4, pb: 3 }}>
                    <Button
                        size='large'
                        disabled={
                            (isLastSnapshotSelected && _.isEmpty(datetimes)) ||
                            (!isTimeTypeRelative &&
                                (!(startTime && endTime) || new Date(startTime) > new Date(endTime)))
                        }
                        onClick={handleApply}>
                        Apply
                    </Button>
                </Flexbox>
            </Flexbox>
        </Dropdown>
    );
};

export default TimeRangeSelector;
