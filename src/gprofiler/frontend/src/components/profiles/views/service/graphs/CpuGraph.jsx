{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import 'chartjs-adapter-date-fns';

import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, TimeScale, Tooltip } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { calcGraphData, calcGraphOptions } from './graphUtils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, TimeScale, zoomPlugin);

const CpuGraph = ({ data, edges, setZoomedTime }) => {
    const [parsedData, setParsedData] = useState(calcGraphData(data, edges, 'avg_cpu', 'max_cpu'));
    const [options, setOptions] = useState(calcGraphOptions(data, setZoomedTime));

    useEffect(() => {
        setParsedData(calcGraphData(data, edges, 'avg_cpu', 'max_cpu'));
        setOptions(calcGraphOptions(data, setZoomedTime));
    }, [data, edges, setZoomedTime]);

    return <Line options={options} data={parsedData} />;
};

export default CpuGraph;
