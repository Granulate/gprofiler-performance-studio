{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { useCallback, useContext, useEffect } from 'react';

import { getStartEndDateTimeFromSelection } from '@/api/utils';
import Button from '@/components/common/button/Button';
import { FlagIcon } from '@/components/common/icon/svgIcons';
import { FgContext, SelectorsContext } from '@/states';
import { COLORS } from '@/theme/colors';
import { addTime, isDateLessThanTenMinutesAgo, TIME_UNITS } from '@/utils/datetimesUtils';

const MineSweeperToggle = () => {
    const { mineSweeperMode, setMineSweeperMode, framesSelected, isFgLoading } = useContext(FgContext);
    const { timeSelection, setTimeSelection, timeFetched } = useContext(SelectorsContext);

    useEffect(() => {
        setMineSweeperMode(false);
    }, [setMineSweeperMode, timeSelection]);

    const handleToggleMineSweeper = useCallback(() => {
        // not a new session, just continue
        if (framesSelected.length > 0) {
            setMineSweeperMode((prev) => !prev);
        }
        // check if time does not include last 10 minutes, if it is change it
        else {
            const timeParams = getStartEndDateTimeFromSelection(timeSelection);
            const isEndTimeTooClose = isDateLessThanTenMinutesAgo(new Date(timeParams.endTime), timeFetched);
            if (isEndTimeTooClose) {
                const newTime = {
                    startTime: addTime(timeParams.startTime, TIME_UNITS.minutes, -10),
                    endTime: addTime(timeParams.endTime, TIME_UNITS.minutes, -10),
                };
                setTimeSelection({ customTime: newTime });
            } else {
                setMineSweeperMode((prev) => !prev);
            }
        }
    }, [framesSelected.length, setMineSweeperMode, setTimeSelection, timeSelection, timeFetched]);

    return (
        <Button
            onClick={handleToggleMineSweeper}
            iconOnly
            disabled={isFgLoading || !timeFetched}
            sx={{
                borderRadius: 2,
                background: mineSweeperMode ? COLORS.PRIMARY_PURPLE : COLORS.BG_GREY,
                '&:hover': {
                    background: COLORS.GREY_3,
                },
                py: 1,
                px: 4,
            }}>
            <FlagIcon color={mineSweeperMode ? 'white' : undefined} />
        </Button>
    );
};

export default MineSweeperToggle;
