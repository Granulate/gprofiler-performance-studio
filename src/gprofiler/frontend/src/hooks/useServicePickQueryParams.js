

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
