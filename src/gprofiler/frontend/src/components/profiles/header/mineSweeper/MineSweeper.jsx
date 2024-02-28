

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
