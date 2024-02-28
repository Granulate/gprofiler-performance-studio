

import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StringParam, useQueryParams } from 'use-query-params';

import { PAGES } from '../utils/consts';

const searchQueryParam = 'search';

const useSearchQueryParams = ({ setSearchValue, searchValue }) => {
    let location = useLocation();

    const [queryParams, setQueryParams] = useQueryParams({
        [searchQueryParam]: StringParam,
        date: StringParam,
    });
    const { search } = queryParams;

    const handleSearchChange = useCallback(() => {
        setQueryParams({ [searchQueryParam]: searchValue || undefined });
    }, [setQueryParams, searchValue]);

    useEffect(() => {
        if (location.pathname === PAGES.profiles.to) {
            handleSearchChange();
        }
    }, [searchValue, handleSearchChange, location.pathname]);

    useEffect(() => {
        if (search) {
            setSearchValue(search);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useSearchQueryParams;
