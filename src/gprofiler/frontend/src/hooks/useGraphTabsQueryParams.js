

import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StringParam, useQueryParams } from 'use-query-params';

import { PAGES } from '../utils/consts';

const graphTabQueryParam = 'gtab';

const useGraphTabQueryParams = ({ selectedGraphTab, setSelectedGraphTab }) => {
    let location = useLocation();

    const [queryParams, setQueryParams] = useQueryParams({
        [graphTabQueryParam]: StringParam,
    });
    const { gtab } = queryParams;

    const handleQueryParamChange = useCallback(() => {
        setQueryParams({ [graphTabQueryParam]: selectedGraphTab });
    }, [setQueryParams, selectedGraphTab]);

    useEffect(() => {
        if (location.pathname === PAGES.profiles.to) {
            handleQueryParamChange();
        }
    }, [selectedGraphTab, handleQueryParamChange, location.pathname]);

    useEffect(() => {
        if (gtab) {
            setSelectedGraphTab(gtab);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useGraphTabQueryParams;
