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

import { useContext, useEffect, useState } from 'react';

import { getStartEndDateTimeFromSelection } from '@/api/utils';
import { SelectorsContext } from '@/states';
import { COLORS } from '@/theme/colors';
import { getTimeDiff, isDateBefore } from '@/utils/datetimesUtils';

const compareDates = (date1, date2) => {
    if (date1 && date2) {
        var dateA = new Date(date1);
        var dateB = new Date(date2);
        return dateA - dateB;
    } else if (date1) {
        return 1;
    }
    return -1;
};

// dataKey2 is an optional key for the case we want 2 lines instead of 1 (example: avg and max)
export const calcGraphData = (data = [], edges, dataKey, dataKey2 = undefined, disableBorderRadius = false) => {
    //this merge the labels array of the data fetched with the edges labels created by the time selection
    const labelsMerged = edges.labels.concat(data.map((dataPoint) => dataPoint.time)).sort(compareDates);

    //this merge the data fetched with the edges (which are created based on the time selection) to one array
    const dataMerged = edges.data
        .concat(
            data.map((dataPoint) => {
                return { x: dataPoint.time, y: dataPoint[dataKey] };
            })
        )
        .sort((a, b) => compareDates(a.x, b.x));
    let data2Merged = [];
    if (dataKey2) {
        data2Merged = edges.data
            .concat(
                data.map((dataPoint) => {
                    return { x: dataPoint.time, y: dataPoint[dataKey2] };
                })
            )
            .sort((a, b) => compareDates(a.x, b.x));
    }

    return {
        labels: labelsMerged,
        datasets: [
            ...(dataKey2
                ? [
                      {
                          label: dataKey2,
                          backgroundColor: COLORS.SECONDARY_ORANGE,
                          borderColor: COLORS.SECONDARY_ORANGE,
                          data: data2Merged,
                          spanGaps: true,
                          barThickness: 7,
                          borderDash: [10, 8],
                          borderRadius: 45,
                          borderWidth: 2,
                          tension: disableBorderRadius ? 0.1 : 0.3,
                          pointHoverRadius: 6,
                      },
                  ]
                : []),
            {
                label: dataKey,
                backgroundColor: COLORS.LIGHT_PURPLE,
                borderColor: COLORS.LIGHT_PURPLE,
                data: dataMerged,
                spanGaps: true,
                barThickness: 7,
                borderRadius: 45,
                borderWidth: 2,
                tension: disableBorderRadius ? 0.1 : 0.3,
                pointHoverRadius: 6,
            },
        ],
    };
};

const timeDiffrenceToTimeUnit = (data) => {
    const timeDiffrence = getTimeDiff(new Date(data[0].time), new Date(data[data.length - 1].time));
    if (timeDiffrence.months || timeDiffrence.days >= 29) {
        return { unit: 'hour', stepSize: 12 };
    } else if (timeDiffrence.days >= 14) {
        return { unit: 'hour', stepSize: 6 };
    } else if (timeDiffrence.days >= 7) {
        return { unit: 'hour', stepSize: 3 };
    } else if (timeDiffrence.days) {
        return { unit: 'minute', stepSize: 30 };
    } else {
        return { unit: 'minute', stepSize: 1 };
    }
};

export const createEmptyDataPoints = (times) => {
    let edgesLabels = [times.startTime + 'Z', times.endTime + 'Z'];
    let edgesData = [
        { x: times.startTime + 'Z', y: null },
        { x: times.endTime + 'Z', y: null },
    ];

    return { edgesLabels, edgesData };
};

export const calcGraphOptions = (data, setZoomedTime) => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            zoom: {
                pan: {
                    enabled: false,
                },
                zoom: {
                    drag: {
                        enabled: true,
                        backgroundColor: 'rgba(160, 174, 192, 0.3)',
                    },
                    mode: 'x',
                    speed: 100,
                    onZoomComplete: setZoomedTime,
                },
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    displayFormats: {
                        millisecond: 'HH:mm:ss.SSS',
                        second: 'HH:mm:ss',
                        minute: 'HH:mm',
                        hour: 'HH:00',
                    },
                    ...(data?.length ? timeDiffrenceToTimeUnit(data) : { unit: 'hour', stepSize: 1 }),
                },
                grid: {
                    drawTicks: false,
                    display: true,
                },
                ticks: {
                    autoSkip: true,
                    autoSkipPadding: 20,
                    maxRotation: 90,
                    minRotation: 30,
                    maxTicksLimit: 48,
                    major: { enabled: true },
                    color: COLORS.PLAIN_GREY,
                    font: {
                        family: 'Lato',
                        style: 'normal',
                        weight: 'normal',
                        size: '12px',
                        lineHeight: '20px',
                    },
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: COLORS.PLAIN_GREY,
                    font: {
                        family: 'Lato',
                        style: 'normal',
                        weight: 'normal',
                        size: '12px',
                        lineHeight: '20px',
                    },
                },
            },
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
    };
};

const getEdgesFromTwoTimeSelections = (time1, time2) => {
    const isTime1TimeStartBefore = isDateBefore(time1.startTime, time2.startTime);
    const isTime1TimeEndBefore = isDateBefore(time1.startTime, time2.startTime);
    return {
        startTime: isTime1TimeStartBefore ? time1.startTime : time2.startTime,
        endTime: isTime1TimeEndBefore ? time2.startTime : time1.startTime,
    };
};

export const useGetEdgesTimes = (secondTimeSelection = undefined) => {
    const { timeSelection } = useContext(SelectorsContext);

    const [edges, setEdges] = useState({ labels: [], data: [] });
    useEffect(() => {
        let timeParams = getStartEndDateTimeFromSelection(timeSelection, true);
        // in case we also have another timeframe
        if (secondTimeSelection) {
            const secondTimeParams = getStartEndDateTimeFromSelection(secondTimeSelection, true);
            timeParams = getEdgesFromTwoTimeSelections(timeParams, secondTimeParams);
        }
        const { edgesLabels, edgesData } = createEmptyDataPoints(timeParams);
        setEdges({ labels: edgesLabels, data: edgesData });
    }, [timeSelection, secondTimeSelection]);

    return { edges };
};
