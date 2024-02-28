

import { useQueryParam } from 'use-query-params';

const SNAPSHOT_QUERY_PARAM = 'snapshot';

const useSnapshotQueryParams = () => {
    const [snapshotQueryParam, setSnapshotQueryParam] = useQueryParam(SNAPSHOT_QUERY_PARAM);

    return [snapshotQueryParam, setSnapshotQueryParam];
};

export default useSnapshotQueryParams;
