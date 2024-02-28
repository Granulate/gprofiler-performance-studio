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

import { Box, Divider } from '@mui/material';

import Flexbox from '@/components/common/layout/Flexbox';
import useOpenAndSearchHotkey from '@/hooks/useOpenAndSearchHotkey';

import FilterDropdown from '../filters/FilterDropdown';
import ProfilesSearch from '../ProfilesSearch';
import ResetViewButton from '../ResetViewButton';
import FullScreenButton from './FullscreenButton';
import FullScreenProfilesTopPanelInfo from './FullscreenProfilesTopPanelInfo';

const FullscreenProfilesTopPanel = ({ isFgDisplayed, searchRef }) => {
    useOpenAndSearchHotkey(searchRef, () => {});
    return (
        <Flexbox spacing={2} justifyContent='space-between' alignItems='center' sx={{ boxShadow: 11 }}>
            <Flexbox
                spacing={2}
                justifyContent='space-between'
                alignItems='center'
                divider={<Divider orientation='vertical' sx={{ borderColor: 'grey.dark', opacity: 0.1 }} flexItem />}>
                <Box sx={{ maxWidth: '200px' }}>
                    <FilterDropdown />
                </Box>

                <Flexbox alignItems='center'>
                    <ProfilesSearch placeholder='Search' disabled={!isFgDisplayed} searchRef={searchRef} />
                </Flexbox>
                <FullScreenProfilesTopPanelInfo />
            </Flexbox>

            <Flexbox spacing={2} justifyContent='space-between' alignItems='center'>
                <ResetViewButton />
                <FullScreenButton />
            </Flexbox>
        </Flexbox>
    );
};

export default FullscreenProfilesTopPanel;
