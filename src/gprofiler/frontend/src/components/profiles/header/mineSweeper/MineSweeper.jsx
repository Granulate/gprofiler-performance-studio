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
