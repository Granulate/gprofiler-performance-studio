

import { useState } from 'react';

import ConsoleRouter from '../../router/ConsoleRouter';
import { SelectorsProvider } from '../../states';
import { FilterTagsContextProvider } from '../../states/filters/FiltersTagsContext';
import { FullScreenStateProvider } from '../../utils/contexts';
import SideNavBar from '../sideNavBar/SideNavBar';
import { ContentContainer, LayoutContainer, Main } from './Console.styles';

const Console = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

    return (
        <FullScreenStateProvider>
            <SelectorsProvider>
                <FilterTagsContextProvider>
                    <LayoutContainer>
                        <SideNavBar onSidebarToggle={setIsSidebarCollapsed} isCollapsed={isSidebarCollapsed} />
                        <ContentContainer>
                            <Main>
                                <ConsoleRouter />
                            </Main>
                        </ContentContainer>
                    </LayoutContainer>
                </FilterTagsContextProvider>
            </SelectorsProvider>
        </FullScreenStateProvider>
    );
};

export default Console;
