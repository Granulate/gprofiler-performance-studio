

import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BooleanParam, useQueryParams } from 'use-query-params';

import { PAGES } from '../utils/consts';

const fullscreenQueryParam = 'fullscreen';

const useFullscreenQueryParams = ({ setFullScreen, isFullScreen }) => {
    let location = useLocation();

    const [queryParams, setQueryParams] = useQueryParams({
        [fullscreenQueryParam]: BooleanParam,
    });
    const { fullscreen } = queryParams;

    const handleQueryParamChange = useCallback(() => {
        setQueryParams({ [fullscreenQueryParam]: isFullScreen || undefined });
    }, [setQueryParams, isFullScreen]);

    useEffect(() => {
        if (location.pathname === PAGES.profiles.to) {
            handleQueryParamChange();
        }
    }, [isFullScreen, handleQueryParamChange, location.pathname]);

    useEffect(() => {
        if (fullscreen) {
            setFullScreen(!!fullscreen);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useFullscreenQueryParams;
