{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { useEffect } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

const serviceQueryParam = 'service';

const useServicePickQueryParams = ({ services, customParam = undefined }) => {
    const [selectedService, setSelectedService] = useQueryParam(customParam || serviceQueryParam, StringParam);
    useEffect(() => {
        if (services?.length > 0 && !services.some((element) => element.name === selectedService)) {
            setSelectedService(services[0].name);
        }
    }, [services, selectedService, setSelectedService]);

    useEffect(() => {}, [selectedService]);

    return { selectedService, setSelectedService };
};

export default useServicePickQueryParams;
