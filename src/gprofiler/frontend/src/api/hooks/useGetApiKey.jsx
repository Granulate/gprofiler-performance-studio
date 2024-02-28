

import { DATA_URLS } from '../../api/urls';
import useFetchWithRequest from '../useFetchWithRequest';

const useGetApiKey = () => {
    const {
        data,
        loading: isApiKeyLoading,
        error,
    } = useFetchWithRequest({
        url: `${DATA_URLS.GET_API_KEY}`,
    });

    return { apiKey: data?.apiKey || '', isApiKeyLoading, error };
};

export default useGetApiKey;
