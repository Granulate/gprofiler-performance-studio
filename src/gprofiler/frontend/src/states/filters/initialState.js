

import { getRuntimesList } from '../../utils/filtersUtils';

const initialState = {
    runtime: {
        allRuntimes: getRuntimesList(),
        filters: getRuntimesList().map((item) => item.name),
        isMixedRuntimeStacksModeEnabled: true,
    },
    processes: {
        filters: [],
        processesList: [],
    },
    weight: {
        threshold: null,
        percentile: 100,
        percentiles: [
            {
                percentile: 100,
                rangeStartPercentage: undefined,
                rangeEndPercentage: undefined,
            },
            {
                percentile: 50,
                rangeStartPercentage: undefined,
                rangeEndPercentage: undefined,
            },
            {
                percentile: 25,
                rangeStartPercentage: undefined,
                rangeEndPercentage: undefined,
            },
            {
                percentile: 5,
                rangeStartPercentage: undefined,
                rangeEndPercentage: undefined,
            },
            {
                percentile: 1,
                rangeStartPercentage: undefined,
                rangeEndPercentage: undefined,
            },
        ],
    },
};

export default initialState;
