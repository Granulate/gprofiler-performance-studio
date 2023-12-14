{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { DATA_URLS } from '../../api/urls';
import useFetchWithRequest from '../useFetchWithRequest';

const useGetServicesDataStatus = () => {
    const { data: services } = useFetchWithRequest(
        {
            url: `${DATA_URLS.GET_SERVICES_LIST}`,
        },
        {
            pollingInterval: 15000,
            pollingWhenHidden: false,
        }
    );
    return { services };
};

export default useGetServicesDataStatus;
