

import { useContext } from 'react';

import { SelectorsContext } from '../../states';
import { DATA_URLS } from '../urls';
import useFetchWithRequest from '../useFetchWithRequest';

const useGetServiceFilters = () => {
    const { selectedService } = useContext(SelectorsContext);

    const {
        data: savedFilters,
        loading: savedFiltersLoading,
        run: getSavedFilters,
    } = useFetchWithRequest(
        { url: DATA_URLS.GET_FILTERS_FOR_SERVICE(selectedService), method: 'GET' },
        {
            refreshDeps: [selectedService],
            ready: !!selectedService,
        }
    );

    return { savedFilters: savedFilters ? savedFilters : [], savedFiltersLoading, getSavedFilters };
};

export default useGetServiceFilters;
