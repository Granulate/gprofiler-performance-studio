

import { ClickAwayListener } from '@mui/material';

import Button from '@/components/common/button/Button';
import Tooltip from '@/components/common/dataDisplay/muiToolTip/Tooltip';
import { COPY_ONLY_IN_HTTPS } from '@/utils/consts';
import { isPathSecure } from '@/utils/generalUtils';

const MineSweeperSaveButton = ({ disabled, saveSnapshot, showCopyTooltip, handleCloseTooltip }) => {
    return (
        <ClickAwayListener onClickAway={handleCloseTooltip}>
            <div>
                <Tooltip
                    variant='dark'
                    open={showCopyTooltip}
                    onClose={handleCloseTooltip}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    PopperProps={{
                        disablePortal: true,
                    }}
                    content={!isPathSecure() ? COPY_ONLY_IN_HTTPS : 'Link copied to clipboard'}>
                    <Button
                        disableElevation
                        disabled={disabled}
                        onClick={saveSnapshot}
                        sxOverrides={{ height: '28px' }}>
                        Save
                    </Button>
                </Tooltip>
            </div>
        </ClickAwayListener>
    );
};

export default MineSweeperSaveButton;
