{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Grid } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import useResizeObserver from 'use-resize-observer';

import FgMenu from '@/components/profiles/views/flamegraph/FgMenu';
import { addOrRemoveNodeFromArray } from '@/components/profiles/views/flamegraph/parsingUtils';
import { FgContext } from '@/states';

import Flamegraph from './Flamegraph';

const FlamegraphView = ({
    flameGraphData,
    searchValue,
    resetZoomedFgData,
    getTooltipData,
    setHoverData,
    setZoomedFgData,
    justSearched,
}) => {
    const [node, setNode] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);
    const { setFramesSelected } = useContext(FgContext);
    const handleData = (node) => {
        setNode(node);
    };

    const handleMarkMine = useCallback(
        (node) => {
            setFramesSelected((prev) => addOrRemoveNodeFromArray(prev, node));
        },
        [setFramesSelected]
    );

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                      mouseX: event.clientX + 2,
                      mouseY: event.clientY - 6,
                  }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                  // Other native context menus might behave different.
                  // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                  null
        );
    };

    const { ref, width = 1, height = 1 } = useResizeObserver();

    return (
        <>
            <Grid container spacing={2} sx={{ height: '100%', overflow: 'auto' }}>
                <Grid
                    item
                    xs={12}
                    lg={12}
                    sx={{
                        backgroundColor: 'white.main',
                    }}>
                    <div
                        ref={ref}
                        onContextMenu={handleContextMenu}
                        style={{
                            overflow: 'hidden',
                            width: '100%',
                            height: '100%',
                        }}>
                        <Flamegraph
                            flameGraphData={flameGraphData}
                            searchMode={searchValue || justSearched}
                            resetZoomedFgData={resetZoomedFgData}
                            fgHeight={height}
                            fgWidth={width}
                            getTooltipData={getTooltipData}
                            setHoverData={setHoverData}
                            setZoomedFgData={setZoomedFgData}
                            setNode={handleData}
                            handleMarkMine={handleMarkMine}
                        />
                    </div>
                </Grid>
            </Grid>
            <FgMenu
                node={node}
                contextMenu={contextMenu}
                setContextMenu={setContextMenu}
                handleMarkMine={handleMarkMine}
            />
        </>
    );
};

export default FlamegraphView;