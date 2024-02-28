

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
