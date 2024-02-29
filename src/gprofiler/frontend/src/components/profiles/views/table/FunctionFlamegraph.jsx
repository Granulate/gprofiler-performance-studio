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

import FlameChart from 'flame-chart-js';
import _ from 'lodash';
import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { FgContext } from '@/states';
import { SplitViewFgHoverContext } from '@/states/flamegraph/SplitViewFgHoverContext';
import { getPercent } from '@/utils/fgUtils';
import { stacksToFgColors } from '@/utils/filtersUtils';

import FlamegraphStyles from '../flamegraph/flamegraph.style';

export const FunctionFlamegraph = memo(({ flameGraphData, width, height, inverted = false }) => {
    const canvasRef = useRef(null);
    const nodeIndexRef = useRef(null);
    const [flameChart, setFlameChart] = useState(undefined);
    const [initiated, setInitiated] = useState(false);
    const [selectedNode, setSelectedNode] = useState(undefined);
    const { setHoverData } = useContext(SplitViewFgHoverContext);
    const { setZoomedFgData } = useContext(FgContext);

    const getTooltipData = useCallback(
        (nodeData) => {
            if (nodeData?.data) {
                const { duration, name, children } = nodeData.data.source;
                const cpuTime = getPercent(duration, flameGraphData[0].duration);
                const ownTime = getPercent(
                    duration - _.sumBy(children, (child) => child.duration),
                    flameGraphData[0].duration
                );
                setHoverData({ name, ownTime, cpuTime, value: duration });
            } else {
                setHoverData('');
            }
        },
        [setHoverData, flameGraphData]
    );

    const handleToolTip = useCallback(
        (data) => {
            const nodeIndex = data?.data?.index;
            if (nodeIndex !== nodeIndexRef.current) {
                nodeIndexRef.current = nodeIndex;
                getTooltipData(data);
            }
            return undefined;
        },
        [getTooltipData]
    );

    const defaultSettings = useMemo(
        () => ({
            options: {
                tooltip: (data) => handleToolTip(data),
                inverted,
            },
            styles: FlamegraphStyles,
        }),
        [handleToolTip, inverted]
    );

    const handleMouseOut = () => {
        setHoverData('');
        nodeIndexRef.current = undefined;
    };

    const resetFlamegraphView = () => {
        flameChart.resize(width, height);
        flameChart.setZoom(0, flameGraphData[0].duration);
    };

    const initFG = useCallback(() => {
        flameChart.setSettings(defaultSettings);

        flameChart.on('mouseup', (node) => {
            if (node && node.index !== 0) {
                setSelectedNode(node);
            } else {
                setSelectedNode(undefined);
            }
        });
        resetFlamegraphView();
        setInitiated(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flameChart, getTooltipData]);

    // first initiantion after flamegraph instance is loaded
    useEffect(() => {
        if (flameChart && !initiated) {
            initFG();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flameChart]);

    useEffect(() => {
        setSelectedNode(undefined);
    }, [flameGraphData]);

    useEffect(() => {
        if (flameChart && flameGraphData) {
            //resize flamegraph height by level of nodes + margin
            resetFlamegraphView();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, height]);

    const createFG = useCallback(
        (canvas) => {
            setFlameChart(
                new FlameChart({
                    canvas,
                    data: flameGraphData,
                    marks: undefined,
                    waterfall: undefined,
                    colors: stacksToFgColors(),
                    settings: defaultSettings,
                })
            );
        },
        [flameGraphData, defaultSettings]
    );

    //init lifecycle for flamegraph
    useEffect(() => {
        if (canvasRef?.current) {
            const canvas = canvasRef.current;
            canvas.oncontextmenu = () => false;
            canvas.addEventListener('mouseout', handleMouseOut, false);
            const ctx = canvas.getContext('2d');
            ctx.width = width;
            ctx.height = height;
            createFG(canvas);
            return () => {
                canvas.removeEventListener('mouseout', handleMouseOut, false);
            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //update parsedData when data is changed or when selected node is changed
    useEffect(() => {
        if (flameChart && flameGraphData) {
            flameChart.setSettings(defaultSettings);
            if (selectedNode) {
                //keeping y position and preventing reset of selected
                flameChart.setData(flameGraphData, true, 0, false);
                flameChart.setZoom(selectedNode.start, selectedNode.end);
                setZoomedFgData(selectedNode);
            } else {
                flameChart.setData(flameGraphData, false, 0, true);
                flameChart.setZoom(0, flameGraphData[0].duration);
                setZoomedFgData(flameGraphData[0]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flameGraphData, selectedNode, flameChart, defaultSettings]);
    return <canvas ref={canvasRef} id='canvas' style={{ borderRadius: '4px' }} />;
});

FunctionFlamegraph.displayName = 'FunctionFlamegraph';
