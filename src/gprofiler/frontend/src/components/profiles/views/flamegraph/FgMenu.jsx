{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
