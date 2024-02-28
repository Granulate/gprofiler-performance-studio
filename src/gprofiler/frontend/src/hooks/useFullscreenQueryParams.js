{/*
 * Copyright (C) 2023 Intel Corporation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/}



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
