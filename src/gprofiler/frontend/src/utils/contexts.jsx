{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
