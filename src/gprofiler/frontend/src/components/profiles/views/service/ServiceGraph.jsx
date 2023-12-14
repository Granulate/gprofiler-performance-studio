{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import TabContext from '@mui/lab/TabContext';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useContext, useEffect, useState } from 'react';

import useGetServiceMemoryAndCpu from '@/api/hooks/useGetServiceMemoryAndCpu';
import useGetServiceNodesAndCores from '@/api/hooks/useGetServiceNodesAndCores';
import useGetServiceSamples from '@/api/hooks/useGetServiceSamples';
import Flexbox from '@/components/common/layout/Flexbox';
import ResoultionDropDown from '@/components/profiles/views/service/ResolutionDropDown';
import { SelectorsContext } from '@/states';

import CoresGraph from './graphs/CoresGraph';
import CpuGraph from './graphs/CpuGraph';
import GraphSkeleton from './graphs/GraphSkeleton';
import { useGetEdgesTimes } from './graphs/graphUtils';
import MemoryGraph from './graphs/MemoryGraph';
import NodesGraph from './graphs/NodesGraph';
import SamplesGraph from './graphs/SamplesGraph';
import { StyledTab, StyledTabPanel, StyledTabs } from './serviceGraph.styles';

const ServiceGraph = memo(() => {
    const [currentTab, setTab] = useState('1');
    const [resolution, setResolution] = useState('');
    const [resolutionValue, setResolutionValue] = useState('');

    const { samplesData, samplesLoading } = useGetServiceSamples({ resolution: resolutionValue });

    const { memoryAndCpuData, memoryAndCpuLoading } = useGetServiceMemoryAndCpu({ resolution: resolutionValue });
    const { nodesAndCoresData, nodesAndCoresLoading } = useGetServiceNodesAndCores({
        resolution: resolutionValue,
    });
    const { edges } = useGetEdgesTimes();

    const { setTimeSelection, selectedGraphTab, setSelectedGraphTab } = useContext(SelectorsContext);
    const setZoomedTime = useCallback(
        ({ chart }) => {
            const firstTick = chart.scales.x.ticks[0];
            const lastTick = chart.scales.x.ticks[chart.scales.x.ticks.length - 1];
            const startTime = new Date(firstTick.value);
            const endTime = new Date(lastTick.value);
            setTimeSelection({ customTime: { startTime, endTime } });
        },
        [setTimeSelection]
    );

    const changeTab = (event, newTab) => {
        setSelectedGraphTab(newTab);
    };

    return (
        <Box sx={{ backgroundColor: 'fieldBlue.main', p: 8, pt: 6, borderRadius: 2, height: '340px' }}>
            <TabContext value={selectedGraphTab}>
                <Flexbox column={false} justifyContent={'space-between'} alignItems={'flex-start'}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '370px', mb: 8 }}>
                        <StyledTabs onChange={changeTab}>
                            <StyledTab label='CPU' value='1' />
                            <StyledTab label='MEMORY' value='2' />
                            <StyledTab label='SAMPLES' value='3' />
                            <StyledTab label='NODES' value='4' />
                            <StyledTab label='CORES' value='5' />
                        </StyledTabs>
                    </Box>
                    <Flexbox alignItems={'center'} sx={{ width: '200px' }}>
                        <Typography sx={{ mr: 2 }}>Resolution:</Typography>
                        <ResoultionDropDown
                            setResolutionValue={setResolutionValue}
                            setResolution={setResolution}
                            resolution={resolution}
                        />
                    </Flexbox>
                </Flexbox>
                <StyledTabPanel value='1'>
                    {memoryAndCpuLoading ? (
                        <GraphSkeleton />
                    ) : (
                        <CpuGraph data={memoryAndCpuData} edges={edges} setZoomedTime={setZoomedTime} />
                    )}
                </StyledTabPanel>
                <StyledTabPanel value='2'>
                    {memoryAndCpuLoading ? (
                        <GraphSkeleton />
                    ) : (
                        <MemoryGraph data={memoryAndCpuData} edges={edges} setZoomedTime={setZoomedTime} />
                    )}
                </StyledTabPanel>
                <StyledTabPanel value='3'>
                    {samplesLoading ? (
                        <GraphSkeleton />
                    ) : (
                        <SamplesGraph data={samplesData} edges={edges} setZoomedTime={setZoomedTime} />
                    )}
                </StyledTabPanel>
                <StyledTabPanel value='4'>
                    {nodesAndCoresLoading ? (
                        <GraphSkeleton />
                    ) : (
                        <NodesGraph data={nodesAndCoresData} edges={edges} setZoomedTime={setZoomedTime} />
                    )}
                </StyledTabPanel>
                <StyledTabPanel value='5'>
                    {nodesAndCoresLoading ? (
                        <GraphSkeleton />
                    ) : (
                        <CoresGraph data={nodesAndCoresData} edges={edges} setZoomedTime={setZoomedTime} />
                    )}
                </StyledTabPanel>
            </TabContext>
        </Box>
    );
});
ServiceGraph.displayName = 'ServiceGraph';
export default ServiceGraph;