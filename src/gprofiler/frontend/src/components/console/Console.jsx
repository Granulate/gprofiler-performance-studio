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
