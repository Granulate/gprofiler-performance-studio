

import _ from 'lodash';
import { stringify } from 'query-string';
import { useContext, useState } from 'react';

import { FilterTagsContext } from '../../states/filters/FiltersTagsContext';
import { SelectorsContext } from '../../states/selectors';
import { DATA_URLS } from '../urls';
import useFetchWithRequest from '../useFetchWithRequest';
import { getStartEndDateTimeFromSelection } from '../utils';

const areParamsDefined = (selectedService, timeSelection, functionName) => {
    return !_.isUndefined(selectedService) && !_.isUndefined(timeSelection) && !!functionName;
};

const useGetTableFunctionCpuData = ({ functionName, customService, customTimeSelection }) => {
    const { selectedService, timeSelection } = useContext(SelectorsContext);
    const { activeFilterTag } = useContext(FilterTagsContext);

    const [parsedData, setParsedData] = useState([]);
    const metricsParams = {
        serviceName: customService || selectedService,
        filter: activeFilterTag?.filter ? JSON.stringify(activeFilterTag) : undefined,
        functionName,
    };

    const timeParams = getStartEndDateTimeFromSelection(customTimeSelection || timeSelection);
    const { data: functionCpuData, loading: functionCpuLoading } = useFetchWithRequest(
        {
            url: DATA_URLS.GET_FUCNTION_CPU_GRAPH + '?' + stringify(_.assign({ ...timeParams }, metricsParams)),
        },
        {
            refreshDeps: [
                customService ? customService : selectedService,
                customTimeSelection ? customTimeSelection : timeSelection,
                functionName,
            ],
            ready: areParamsDefined(
                customService ? customService : selectedService,
                customTimeSelection ? customTimeSelection : timeSelection,
                functionName
            ),
            onBefore: () => setParsedData([]),
            onSuccess: (result) => {
                setParsedData(
                    result.map((cpuData) => {
                        return { cpu_percentage: cpuData.cpu_percentage * 100, time: cpuData.time };
                    })
                );
            },
        }
    );
    return {
        functionCpuData: parsedData,
        functionCpuLoading,
    };
};

export default useGetTableFunctionCpuData;
