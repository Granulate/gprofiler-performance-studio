{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
