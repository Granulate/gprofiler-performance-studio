{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
