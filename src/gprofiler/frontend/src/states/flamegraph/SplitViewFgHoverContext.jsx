

import { createContext, useState } from 'react';

export const SplitViewFgHoverContext = createContext();

export const SplitViewFgHoverContextProvider = ({ children }) => {
    const [hoverData, setHoverData] = useState('');
    return (
        <SplitViewFgHoverContext.Provider value={{ hoverData, setHoverData }}>
            {children}
        </SplitViewFgHoverContext.Provider>
    );
};
