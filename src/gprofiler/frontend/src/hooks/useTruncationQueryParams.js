{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
