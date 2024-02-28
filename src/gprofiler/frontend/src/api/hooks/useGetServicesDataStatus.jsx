

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
