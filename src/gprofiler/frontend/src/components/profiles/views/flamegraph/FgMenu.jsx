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

import { styled } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useContext, useEffect, useMemo } from 'react';

import { checkIfMine } from '@/components/profiles/views/flamegraph/parsingUtils';
import { FgContext } from '@/states';
import { COPY_ONLY_IN_HTTPS } from '@/utils/consts';
import { isPathSecure } from '@/utils/generalUtils';

const FgMenu = ({ node = null, contextMenu, setContextMenu, handleMarkMine }) => {
    const { mineSweeperMode, framesSelected } = useContext(FgContext);

    const handleClose = useCallback(() => {
        setContextMenu(null);
    }, [setContextMenu]);

    useEffect(() => {
        if (!node && contextMenu !== null) {
            handleClose();
        }
    }, [node, handleClose, contextMenu]);

    const handleCopyNodeName = () => {
        if (isPathSecure()) {
            navigator.clipboard.writeText(node?.name);
        }
        handleClose();
    };

    const isMine = useMemo(
        () =>
            node
                ? checkIfMine({ start: node.start, duration: node.duration, level: node.level }, framesSelected)
                : false,
        [node, framesSelected]
    );

    const handleClickMarkMine = () => {
        handleMarkMine(node);
        handleClose();
    };

    return (
        <Menu
            open={contextMenu !== null}
            PaperProps={{ sx: { backgroundColor: 'grey.dark', borderRadius: '2px' } }}
            MenuListProps={{ sx: { p: 0 } }}
            onClose={handleClose}
            anchorReference='anchorPosition'
            anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}>
            <StyledMenuItem dense onClick={handleCopyNodeName}>
                Copy {!isPathSecure() ? `- ${COPY_ONLY_IN_HTTPS}` : ''}
            </StyledMenuItem>
            {mineSweeperMode && (
                <StyledMenuItem dense onClick={handleClickMarkMine}>
                    {isMine ? 'Clear' : 'Mark'}
                </StyledMenuItem>
            )}
        </Menu>
    );
};

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.white.main,
    ...theme.typography.body4_lato,
    '&:hover': { background: theme.palette.hoverGrey.main },
}));

export default FgMenu;
