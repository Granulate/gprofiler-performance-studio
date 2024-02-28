

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
