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

import _ from 'lodash';
import { createContext, useContext, useState } from 'react';

import useDetectEscHotkey from '../hooks/useDetectEscHotkey';
import useFullscreenQueryParams from '../hooks/useFullscreenQueryParams';

const FullScreenContext = createContext({
    isFullScreen: false,
    setFullScreen: _.noop,
});

const useFullScreenContext = () => {
    return useContext(FullScreenContext);
};

const FullScreenStateProvider = ({ children }) => {
    const [isFullScreen, setFullScreen] = useState(false);
    useDetectEscHotkey(() => setFullScreen(false));
    useFullscreenQueryParams({ isFullScreen, setFullScreen });

    return <FullScreenContext.Provider value={{ isFullScreen, setFullScreen }}>{children}</FullScreenContext.Provider>;
};

export { FullScreenStateProvider, useFullScreenContext };
