

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
