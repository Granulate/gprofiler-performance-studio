

import { useCallback, useEffect } from 'react';
import { BooleanParam, useQueryParam } from 'use-query-params';

const truncationQueryParam = 'truncation';

const useTruncationQueryParams = ({ setViewTruncated, viewTruncated }) => {
    const [isTruncated, setTruncated] = useQueryParam(truncationQueryParam, BooleanParam);

    const handleTrucatedChange = useCallback(
        (truncated) => {
            setTruncated(truncated ? truncated : undefined);
        },
        [setTruncated]
    );

    useEffect(() => {
        handleTrucatedChange(viewTruncated);
    }, [viewTruncated, handleTrucatedChange]);

    useEffect(() => {
        if (isTruncated) {
            setViewTruncated(!!isTruncated);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useTruncationQueryParams;
