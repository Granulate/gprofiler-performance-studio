

import { DATA_URLS } from '../urls';
import useFetchWithRequest from '../useFetchWithRequest';

const useGetSummaryData = () => {
    const { data: summaryData, loading } = useFetchWithRequest({
        url: `${DATA_URLS.GET_SERVICES_SUMMARY}`,
    });

    return { summaryData: summaryData, loading };
};

export default useGetSummaryData;
