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
