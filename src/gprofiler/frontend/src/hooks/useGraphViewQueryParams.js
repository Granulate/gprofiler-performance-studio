{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StringParam, useQueryParam } from 'use-query-params';

import { PAGES } from '../utils/consts';

const viewQueryParam = 'view';

const useGraphViewQueryParams = ({ setViewMode, viewMode }) => {
    let location = useLocation();

    const [selectedView, setSelectedView] = useQueryParam(viewQueryParam, StringParam);

    const handleViewChange = useCallback(
        (viewMode) => {
            setSelectedView(viewMode);
        },
        [setSelectedView]
    );

    useEffect(() => {
        if (location.pathname === PAGES.profiles.to) {
            handleViewChange(viewMode);
        }
    }, [viewMode, handleViewChange, location.pathname]);

    useEffect(() => {
        if (selectedView) {
            setViewMode(selectedView);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useGraphViewQueryParams;
