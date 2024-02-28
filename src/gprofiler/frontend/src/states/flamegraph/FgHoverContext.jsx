

import { createContext, useState } from 'react';

export const FgHoverContext = createContext();

export const FgHoverContextProvider = ({ children }) => {
    const [hoverData, setHoverData] = useState('');
    return <FgHoverContext.Provider value={{ hoverData, setHoverData }}>{children}</FgHoverContext.Provider>;
};
