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
import { useContext } from 'react';

import { FgContext, SearchContext, SelectorsContext } from '../../../states';
import { COLORS } from '../../../theme/colors';
import { PROFILES_VIEWS } from '../../../utils/consts';
import { useFullScreenContext } from '../../../utils/contexts';
import Flexbox from '../../common/layout/Flexbox';
import FullScreenButton from './fullscreen/FullscreenButton';
import FullscreenProfilesTopPanel from './fullscreen/FullscreenProfilesTopPanel';
import ProfilesMetricsPanel from './metricsPanel/ProfilesMetricsPanel';
import MineSweeper from './mineSweeper/MineSweeper';
import ProfilesSearch from './ProfilesSearch';
import ProfilesTopPanelInfo from './ProfilesTopPanelInfo';
import ResetViewButton from './ResetViewButton';
import ViewModeSwitch from './viewModeSwitch/ViewModeSwitch';

const PanelDivider = () => <Divider orientation='vertical' sx={{ borderColor: 'grey.dark', opacity: 0.1 }} flexItem />;

const ProfilesTopPanel = () => {
    const { isFgDisplayed } = useContext(FgContext);

    const { searchRef } = useContext(SearchContext);
    const { isFullScreen } = useFullScreenContext();
    const { viewMode } = useContext(SelectorsContext);

    const isServiceView = viewMode === PROFILES_VIEWS.service;
    const disabled = !isFgDisplayed || isServiceView;

    return (
        <Flexbox column spacing={2}>
            {isFullScreen ? (
                <FullscreenProfilesTopPanel isFgDisplayed={isFgDisplayed} searchRef={searchRef} />
            ) : (
                <>
                    <Box
                        sx={{
                            background: isFullScreen
                                ? 'white.main'
                                : `linear-gradient(180deg,${COLORS.ALMOST_WHITE} 50%, ${COLORS.WHITE} 50%)`,
                            px: isFullScreen ? 1 : 4,
                            zIndex: 1,
                        }}>
                        <Flexbox
                            spacing={4}
                            justifyContent='space-between'
                            alignItems='center'
                            sx={{
                                height: '45px',
                                width: '100%',
                                backgroundColor: 'white.main',
                                boxShadow: '0px 8px 12px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31)',
                                borderRadius: '26px',
                                px: 5,
                            }}>
                            <Flexbox
                                sx={{ width: '100%', maxWidth: '80%' }}
                                alignItems='center'
                                spacing={3}
                                divider={<PanelDivider />}
                                justifyContent='start'>
                                <ProfilesSearch placeholder='Search' disabled={disabled} searchRef={searchRef} />

                                {!disabled && <ProfilesTopPanelInfo />}
                            </Flexbox>
                            <Flexbox spacing={4} justifyContent='space-between' alignItems='center'>
                                <ResetViewButton disabled={disabled} />
                                <PanelDivider />
                                <ViewModeSwitch />
                                <FullScreenButton disabled={disabled} />
                            </Flexbox>
                        </Flexbox>
                    </Box>
                    <Flexbox sx={{ px: 5, width: '100%' }} spacing={3}>
                        <MineSweeper />
                        <ProfilesMetricsPanel />
                    </Flexbox>
                </>
            )}
        </Flexbox>
    );
};

export default ProfilesTopPanel;
