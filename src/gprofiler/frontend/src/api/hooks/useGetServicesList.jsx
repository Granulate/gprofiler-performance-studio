{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { useContext } from 'react';

import { DATA_URLS } from '../../api/urls';
import { SelectorsContext } from '../../states';
import useFetchWithRequest from '../useFetchWithRequest';

const SERVICES_UPDATE_INTERVAL = 30000;

const useGetServicesList = ({ interval = SERVICES_UPDATE_INTERVAL, disableAutoSelection = false }) => {
    const { setServices, setAreServicesLoading, setSelectedService, selectedService } = useContext(SelectorsContext);
    useFetchWithRequest(
        {
            url: `${DATA_URLS.GET_SERVICES_LIST}`,
        },
        {
            pollingInterval: interval,
            pollingWhenHidden: false,
            onSuccess: (result) => {
                if (result?.length > 0 && !selectedService && !disableAutoSelection) {
                    setSelectedService(result[0].name);
                }
                if (result?.length > 0) {
                    setServices(result);
                }
                setAreServicesLoading(false);
            },
        }
    );

    return {};
};

export default useGetServicesList;
