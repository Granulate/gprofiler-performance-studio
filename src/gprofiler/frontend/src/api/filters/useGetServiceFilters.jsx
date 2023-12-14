{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
