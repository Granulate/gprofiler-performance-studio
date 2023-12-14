{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { createContext, useEffect, useState } from 'react';

import useGraphTabQueryParams from '@/hooks/useGraphTabsQueryParams';

import useGraphViewQueryParams from '../../hooks/useGraphViewQueryParams';
import useServicePickQueryParams from '../../hooks/useServicePickQueryParams';
import useTimePickQueryParams from '../../hooks/useTimePickQueryParams';
import { PROFILES_VIEWS } from '../../utils/consts';
import { DEFAULT_INITIAL_TIME_RANGE_FILTER } from '../../utils/fgUtils';

export const SelectorsContext = createContext();

export const SelectorsProvider = ({ children }) => {
    const [services, setServices] = useState([]);
    const [viewMode, setViewMode] = useState(PROFILES_VIEWS.flamegraph);
    const [selectedGraphTab, setSelectedGraphTab] = useState('1');
    const [areServicesLoading, setAreServicesLoading] = useState(true);
    const { selectedService, setSelectedService } = useServicePickQueryParams({ services });
    const [ignoreZeros, setIgnoreZeros] = useState(true);
    const [selectedServiceEnvType, setSelectedServiceEnvType] = useState('');

    const [timeSelection, setTimeSelection] = useState({ relativeTime: DEFAULT_INITIAL_TIME_RANGE_FILTER });
    const [absoluteTimeSelection, setAbsoluteTimeSelection] = useState({ startTime: '', endTime: '' });

    const [timeFetched, setTimeFetched] = useState(undefined);
    const resetSelectedTimeRange = () => {
        setTimeSelection({ relativeTime: DEFAULT_INITIAL_TIME_RANGE_FILTER });
    };

    //save envType of selected service
    useEffect(() => {
        if (selectedService) {
            const foundService = services.find((service) => service.name === selectedService);
            if (foundService) {
                setSelectedServiceEnvType(foundService.envType);
            } else {
                setSelectedServiceEnvType('');
            }
        } else {
            setSelectedServiceEnvType('');
        }
    }, [selectedService, services]);

    useTimePickQueryParams({
        setTimeSelection,
        timeSelection,
    });

    useGraphViewQueryParams({ viewMode, setViewMode });
    useGraphTabQueryParams({ selectedGraphTab, setSelectedGraphTab });

    return (
        <SelectorsContext.Provider
            value={{
                services,
                setServices,
                areServicesLoading,
                setAreServicesLoading,
                selectedService,
                selectedServiceEnvType,
                setSelectedService,
                timeSelection,
                viewMode,
                setViewMode,
                setTimeSelection,
                timeFetched,
                setTimeFetched,
                absoluteTimeSelection,
                setAbsoluteTimeSelection,
                resetSelectedTimeRange,
                ignoreZeros,
                setIgnoreZeros,
                selectedGraphTab,
                setSelectedGraphTab,
            }}>
            {children}
        </SelectorsContext.Provider>
    );
};
