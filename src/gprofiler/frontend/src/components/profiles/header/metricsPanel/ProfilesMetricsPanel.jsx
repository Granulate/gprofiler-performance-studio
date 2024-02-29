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

import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import _ from 'lodash';
import { useCallback, useContext, useMemo, useState } from 'react';

import useGetCpuAndMemoryTrend from '@/api/hooks/useGetCpuAndMemoryTrend';
import Flexbox from '@/components/common/layout/Flexbox';
import ShowPanelButton from '@/components/profiles/header/metricsPanel/ShowPanelButton';
import TrendInformation from '@/components/profiles/views/table/TrendInformation';
import { FgContext } from '@/states';
import { FilterTagsContext } from '@/states/filters/FiltersTagsContext';
import { COLORS } from '@/theme/colors';
import { parseCPUValue, parseMemoryValue } from '@/utils/metricsUtils';

import ClosePanelButton from './ClosePanelButton';
import InfoBox, { PanelDivider } from './InfoBox';
import InstanceTypeTooltip from './InstanceTypeTooltip';

const ProfilesMetricsPanel = () => {
    const {
        fgMetrics,
        fgOriginData,
        coresNodesCount,
        fgMetricsLoading,
        coresNodesCountLoading,
        fgOriginDataLoading,
        instanceType,
        instanceTypeLoading,
    } = useContext(FgContext);
    const { activeFilterTag } = useContext(FilterTagsContext);
    const { cpuAndMemoryTrendData, cpuAndMemoryTrendLoading } = useGetCpuAndMemoryTrend();

    const [showPanel, setShowPanel] = useState(true);
    const instanceTypeValue = useMemo(() => {
        return instanceTypeLoading ? undefined : !_.isEmpty(instanceType) ? instanceType[0]?.instance_type : null;
    }, [instanceType, instanceTypeLoading]);
    const hasFilter = useMemo(() => !_.isEmpty(activeFilterTag), [activeFilterTag]);

    const handlePanelShowState = useCallback(() => setShowPanel((prevState) => !prevState), [setShowPanel]);
    const current_avg_cpu = cpuAndMemoryTrendData?.avg_cpu?.toFixed(2);
    const compared_avg_cpu = cpuAndMemoryTrendData?.compared_avg_cpu?.toFixed(2);
    const current_avg_memory = cpuAndMemoryTrendData?.avg_memory?.toFixed(2);
    const compared_avg_memory = cpuAndMemoryTrendData?.compared_avg_memory?.toFixed(2);
    const trendCpuPercentage = (current_avg_cpu - compared_avg_cpu).toFixed(2);
    const trendMemoryPercentage = (current_avg_memory - compared_avg_memory).toFixed(2);

    return (
        <Flexbox
            justifyContent='center'
            sx={{ mt: '-5px !important', minHeight: '30px', position: 'relative', width: '100%' }}>
            {showPanel && (
                <Grow in>
                    <Box sx={{ pt: 7, position: 'relative' }}>
                        <Flexbox
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={{ xs: 0, md: 2, xl: 5 }}
                            justifyContent='space-between'
                            alignItems='center'
                            divider={<PanelDivider />}
                            sx={{
                                borderRadius: '45px',
                                background: COLORS.ALMOST_WHITE,
                                width: 'fit-content',
                                px: 5,
                            }}>
                            {fgOriginData && (
                                <InfoBox
                                    title='Samples collected'
                                    value={fgOriginDataLoading ? undefined : fgOriginData.value.toLocaleString()}
                                    width={55}
                                />
                            )}
                            {!cpuAndMemoryTrendLoading && (
                                <Flexbox spacing={1}>
                                    <TrendInformation
                                        trendType={'CPU'}
                                        trendPercentage={trendCpuPercentage}
                                        currentConsumption={current_avg_cpu}
                                        lastConsumption={compared_avg_cpu}
                                    />
                                </Flexbox>
                            )}
                            <InfoBox
                                title='CPU utilization'
                                value={
                                    fgMetricsLoading ? undefined : fgMetrics?.avg_cpu ? parseCPUValue(fgMetrics) : 'N/A'
                                }
                                width={150}
                            />
                            {!cpuAndMemoryTrendLoading && (
                                <Flexbox spacing={1}>
                                    <TrendInformation
                                        trendType={'Memory'}
                                        trendPercentage={trendMemoryPercentage}
                                        currentConsumption={current_avg_memory}
                                        lastConsumption={compared_avg_memory}
                                    />
                                </Flexbox>
                            )}
                            <InfoBox
                                title='Memory utilization'
                                value={
                                    fgMetricsLoading
                                        ? undefined
                                        : fgMetrics?.avg_memory
                                        ? parseMemoryValue(fgMetrics)
                                        : 'N/A'
                                }
                                width={150}
                            />
                            <InfoBox
                                tooltip='Average nodes over time range selected'
                                title='Nodes'
                                value={
                                    coresNodesCountLoading
                                        ? undefined
                                        : _.isNil(coresNodesCount?.avg_nodes)
                                        ? 'N/A'
                                        : coresNodesCount.avg_nodes
                                }
                                width={10}
                            />
                            <InfoBox
                                tooltip='Average cores over time range selected'
                                title='Cores'
                                value={coresNodesCountLoading ? undefined : coresNodesCount?.avg_cores || 'N/A'}
                                width={10}
                            />
                            {!_.isEmpty(instanceType) && !hasFilter && (
                                <InstanceTypeTooltip instanceTypeData={instanceType}>
                                    <div>
                                        <InfoBox
                                            title='Instances types'
                                            value={
                                                instanceTypeValue +
                                                (instanceType.length > 1 ? ` (+${instanceType.length - 1})` : '')
                                            }
                                            width={10}
                                        />
                                    </div>
                                </InstanceTypeTooltip>
                            )}
                        </Flexbox>
                        <ClosePanelButton handlePanelShowState={handlePanelShowState} />
                    </Box>
                </Grow>
            )}

            <ShowPanelButton handlePanelShowState={handlePanelShowState} showPanel={showPanel} />
        </Flexbox>
    );
};

export default ProfilesMetricsPanel;
