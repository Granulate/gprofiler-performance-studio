

import 'chartjs-adapter-date-fns';

import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, TimeScale, Tooltip } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { calcGraphData, calcGraphOptions } from './graphUtils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, TimeScale, zoomPlugin);

const NodesGraph = ({ data, edges, setZoomedTime }) => {
    const [parsedData, setParsedData] = useState(calcGraphData(data, edges, 'avg_nodes', 'max_nodes'));
    const [options, setOptions] = useState(calcGraphOptions(data, setZoomedTime));

    useEffect(() => {
        setParsedData(calcGraphData(data, edges, 'avg_nodes', 'max_nodes'));
        setOptions(calcGraphOptions(data, setZoomedTime));
    }, [data, edges, setZoomedTime]);

    return <Line options={options} data={parsedData} />;
};

export default NodesGraph;
