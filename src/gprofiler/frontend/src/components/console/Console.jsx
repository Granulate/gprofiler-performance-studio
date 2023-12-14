{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
