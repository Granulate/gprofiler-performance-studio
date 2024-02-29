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

import FlameChart from 'flame-chart-js/dist/bundle';
import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { FiltersContext } from '@/states';
import { stacksToFgColors } from '@/utils/filtersUtils';

import useFlameGraphHotkeys from '../../../../hooks/useFlameGraphHotkeys';
import FlamegraphStyles from './flamegraph.style';

const Flamegraph = memo(
    ({
        flameGraphData,
        getTooltipData,
        setHoverData,
        setZoomedFgData,
        fgWidth,
        fgHeight,
        resetZoomedFgData,
        searchMode,
        setNode,
    }) => {
        const canvasRef = useRef(null);
        const nodeIndexRef = useRef(null);
        const [flameChart, setFlameChart] = useState(undefined);

        const [initiated, setInitiated] = useState(false);
        const [searchLinkCheck, setSearchLinkCheck] = useState(true);

        const [previousFgWidth, setPreviousFgWidth] = useState(fgWidth);
        const [selectedNode, setSelectedNode] = useState(undefined);
        const { addNewSavedFrame, resetSavedFrames } = useFlameGraphHotkeys({ setSelectedNode });

        const {
            filters: { processes: processesFilters, weight: weightFilters, runtime: runtimeFilters },
        } = useContext(FiltersContext);

        const resetFlamegraphView = () => {
            flameChart.resize(fgWidth, fgHeight);
            flameChart.setZoom(0, flameGraphData[0].duration);
        };

        //go to full fg view on processes and weights filters changes
        useEffect(() => {
            setSelectedNode(undefined);
            resetSavedFrames();
        }, [processesFilters, weightFilters, resetSavedFrames]);

        //reset saved frames on runtime filter changes
        useEffect(() => {
            resetSavedFrames();
        }, [runtimeFilters, resetSavedFrames]);

        const handleNodeMouseUp = useCallback(
            (node) => {
                if (node) {
                    if (node.index !== 0) {
                        setSelectedNode(node);
                    } else {
                        setSelectedNode(undefined);
                    }
                    addNewSavedFrame(node);
                } else {
                    setSelectedNode(undefined);
                }
            },
            [addNewSavedFrame]
        );

        const handleRightClick = useCallback(
            (node) => {
                setNode(node);
            },
            [setNode]
        );

        const handleCanvasMouseOut = () => {
            setHoverData('');
            nodeIndexRef.current = undefined;
            setTimeout(() => {
                setHoverData('');
                nodeIndexRef.current = undefined;
            }, 100);
        };

        const handleToolTip = useCallback(
            (data, engine, mouse) => {
                const nodeIndex = data?.data?.index;
                if (nodeIndex !== nodeIndexRef.current) {
                    nodeIndexRef.current = nodeIndex;
                    getTooltipData(data, engine, mouse);
                }
                return undefined;
            },
            [getTooltipData]
        );

        const defaultSettings = useMemo(
            () => ({
                options: {
                    tooltip: (data, renderEngine, mouse) => handleToolTip(data, renderEngine, mouse),
                    inverted: false,
                },
                styles: FlamegraphStyles,
            }),
            [handleToolTip]
        );

        const updateStylesSetting = useCallback(
            (newStyles) => {
                if (flameChart) {
                    flameChart.setSettings({
                        options: { ...defaultSettings.options },
                        styles: { ...newStyles },
                    });
                }
            },
            [defaultSettings, flameChart]
        );

        const initFG = useCallback(() => {
            flameChart.setSettings(defaultSettings);

            flameChart.on('rightClick', handleRightClick);

            flameChart.on('mouseout', () => {
                handleCanvasMouseOut();
            });
            flameChart.on('mouseup', handleNodeMouseUp);
            flameChart.toggleSelectLogic(true);
            resetFlamegraphView();
            setInitiated(true);
            flameChart.setData(flameGraphData, false, 0, true);
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
            if (flameChart && flameGraphData && Math.abs(previousFgWidth - fgWidth) > 20) {
                //resize flamegraph height by level of nodes + margin
                setPreviousFgWidth(fgWidth);
                if (selectedNode) {
                    flameChart.resize(fgWidth, fgHeight);
                    flameChart.setZoom(selectedNode.start, selectedNode.end);
                    setZoomedFgData(selectedNode);
                } else {
                    resetFlamegraphView();
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [fgWidth]);

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
            const canvas = canvasRef.current;
            canvas.oncontextmenu = () => false;
            const ctx = canvas.getContext('2d');
            ctx.width = fgWidth;
            ctx.height = fgHeight;
            createFG(canvas);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        //update parsedData when data is changed or when selected node is changed
        useEffect(() => {
            if (flameChart && flameGraphData) {
                if (selectedNode) {
                    //keeping y position and preventing reset of selected
                    flameChart.setData(flameGraphData, true, 0, false);
                    if (!searchMode && searchLinkCheck) {
                        setSearchLinkCheck(false);
                    }
                    flameChart.setZoom(
                        selectedNode.start,
                        selectedNode.end || selectedNode.start + selectedNode.duration
                    );
                    setZoomedFgData(selectedNode);
                } else {
                    if (searchMode && !searchLinkCheck) {
                        flameChart.setData(flameGraphData, true, 0, true);
                    } else {
                        flameChart.setData(flameGraphData, false, 0, true);
                        flameChart.setZoom(0, flameGraphData[0].duration);
                        setSearchLinkCheck(false);
                    }

                    resetZoomedFgData();
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [flameGraphData, selectedNode]);

        useEffect(() => {
            if (flameChart) {
                updateStylesSetting(FlamegraphStyles);
            } else {
                updateStylesSetting({ main: FlamegraphStyles.main });
            }
        }, [flameChart, updateStylesSetting, flameGraphData]);

        return <canvas ref={canvasRef} id='canvas' style={{ borderRadius: '4px' }} />;
    }
);
Flamegraph.displayName = 'Flamegraph';
export default Flamegraph;
