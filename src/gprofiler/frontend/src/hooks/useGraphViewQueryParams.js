

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
