

import _ from 'lodash';

import { DATA_URLS } from '../urls';
import useFetchWithRequest from '../useFetchWithRequest';

const useGetOverviewPageData = () => {
    const { data: servicesData, loading: servicesLoading } = useFetchWithRequest({
        url: `${DATA_URLS.GET_SERVICES_DATA}`,
    });

    return { servicesData, servicesLoading };
};

export { useGetOverviewPageData };
