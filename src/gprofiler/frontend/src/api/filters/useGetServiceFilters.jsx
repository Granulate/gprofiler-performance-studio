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
