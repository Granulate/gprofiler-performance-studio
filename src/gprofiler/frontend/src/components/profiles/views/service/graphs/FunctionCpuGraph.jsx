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

import 'chartjs-adapter-date-fns';

import { Typography } from '@mui/material';
import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, TimeScale, Tooltip } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import Flexbox from '@/components/common/layout/Flexbox';
import GraphSkeleton from '@/components/profiles/views/service/graphs/GraphSkeleton';

import { mergeArrays } from '../../../../../utils/generalUtils';
import { calcGraphData, calcGraphOptions, useGetEdgesTimes } from './graphUtils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, TimeScale, zoomPlugin);

const FunctionCpuGraph = ({
    functionCpuData,
    functionCpuLoading,
    compareFunctionCpuData,
    compareFunctionCpuLoading,
    compareTimeSelection,
}) => {
    const { edges } = useGetEdgesTimes(compareTimeSelection);

    const [mergedData, setMergedData] = useState(functionCpuData);
    const [parsedData, setParsedData] = useState(
        calcGraphData(mergedData, edges, 'cpu_percentage', 'compare_cpu_percentage', true)
    );
    const [options, setOptions] = useState(calcGraphOptions(mergedData));

    useEffect(() => {
        setParsedData(calcGraphData(mergedData, edges, 'cpu_percentage', 'compare_cpu_percentage', true));
        setOptions(calcGraphOptions(mergedData));
    }, [mergedData, edges]);

    useEffect(() => {
        setMergedData(
            compareFunctionCpuData
                ? mergeArrays(
                      functionCpuData || [],
                      //change the data
                      compareFunctionCpuData.map((dataPoint) => {
                          return { time: dataPoint.time, compare_cpu_percentage: dataPoint.cpu_percentage };
                      }),
                      'time'
                  )
                : functionCpuData
        );
    }, [functionCpuData, compareFunctionCpuData]);

    return functionCpuLoading ? (
        <GraphSkeleton />
    ) : functionCpuData?.length > 0 ? (
        <Line options={options} data={parsedData} />
    ) : (
        <Flexbox column justifyContent='center' alignItems='center' sx={{ height: '100%', width: '100%' }}>
            <Typography sx={{ textAlign: 'center' }}>No data was found for the selected function</Typography>
        </Flexbox>
    );
};

export default FunctionCpuGraph;
