{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
