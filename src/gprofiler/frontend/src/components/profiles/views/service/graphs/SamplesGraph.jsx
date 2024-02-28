

import 'chartjs-adapter-date-fns';

import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, TimeScale, Tooltip } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { calcGraphData, calcGraphOptions } from './graphUtils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, TimeScale, zoomPlugin);

const SamplesGraph = ({ data, edges, setZoomedTime }) => {
    const [parsedData, setParsedData] = useState(calcGraphData(data, edges, 'samples'));

    const [options, setOptions] = useState(calcGraphOptions(data, setZoomedTime));

    useEffect(() => {
        setParsedData(calcGraphData(data, edges, 'samples'));
        setOptions(calcGraphOptions(data, setZoomedTime));
    }, [data, edges, setZoomedTime]);

    return <Bar options={options} data={parsedData} />;
};

export default SamplesGraph;
