{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { useCallback, useContext, useState } from 'react';

import { useGetSnapshot, usePostSnapshot } from '@/api/hooks/useGetSnapshot';
import Button from '@/components/common/button/Button';
import Flexbox from '@/components/common/layout/Flexbox';
import useSnapshotQueryParams from '@/hooks/useSnapshotQueryParams';
import { FgContext } from '@/states';

import MineSweeperSaveButton from './MineSweeperSaveButton';
import MineSweeperToggle from './MineSweeperToggle';

const MineSweeper = () => {
    const { mineSweeperMode, framesSelected, setFramesSelected } = useContext(FgContext);

    const handleClearMines = useCallback(() => setFramesSelected([]), [setFramesSelected]);

    const [showCopyTooltip, setShowCopyTooltip] = useState(false);

    const handleCloseTooltip = useCallback(() => {
        setShowCopyTooltip(false);
    }, [setShowCopyTooltip]);

    const [snapshotQueryParam, setSnapshotQueryParam] = useSnapshotQueryParams();
    const { saveSnapshot, loadingSaveSnapshot, isSnapshotLocal } = usePostSnapshot({
        frames: framesSelected,
        setSnapshotQueryParam,
        setShowCopyTooltip,
    });

    const { snapshotLoading } = useGetSnapshot({
        snapshotId: snapshotQueryParam,
        isSnapshotLocal,
    });

    const shouldDisableSave = !framesSelected?.length || loadingSaveSnapshot || snapshotLoading;

    return (
        <Flexbox justifyContent='center' alignItems='center' sx={{ mt: '20px' }} spacing={3}>
            <MineSweeperToggle />
            {mineSweeperMode && (
                <Button variant='text' onClick={handleClearMines} sx={{ whiteSpace: 'nowrap' }}>
                    Clear all
                </Button>
            )}
            <MineSweeperSaveButton
                disabled={shouldDisableSave}
                saveSnapshot={saveSnapshot}
                showCopyTooltip={showCopyTooltip}
                handleCloseTooltip={handleCloseTooltip}
            />
        </Flexbox>
    );
};

export default MineSweeper;
