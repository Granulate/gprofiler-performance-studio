{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box } from '@mui/material';
import _ from 'lodash';
import { memo, useContext } from 'react';

import useGetServicesList from '../../api/hooks/useGetServicesList';
import useSearchHotkey from '../../hooks/useSearchHotkey';
import { SearchContext, SelectorsContext } from '../../states';
import { FgHoverContextProvider } from '../../states/flamegraph/FgHoverContext';
import { useFullScreenContext } from '../../utils/contexts';
import FGLoader from './FGLoader';
import ProfilesHeader from './header/ProfilesHeader';
import ProfilesTopPanel from './header/ProfilesTopPanel';
import NoServices from './NoServices';
import ProfilesWrapper from './ProfilesWrapper';

const ProfilesPage = memo(({ isDisabled = false }) => {
    const { services, areServicesLoading } = useContext(SelectorsContext);

    const { searchRef } = useContext(SearchContext);
    const { isFullScreen } = useFullScreenContext();

    useGetServicesList({});

    const hasNoServices = _.isEmpty(services);

    useSearchHotkey(searchRef);

    return (
        <FgHoverContextProvider>
            <Box sx={{ backgroundColor: 'white.main', height: '100%' }}>
                {!isFullScreen && <ProfilesHeader isGrayedOut={isDisabled || areServicesLoading || hasNoServices} />}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <ProfilesTopPanel />

                    {isDisabled ? (
                        <div />
                    ) : areServicesLoading ? (
                        <FGLoader />
                    ) : hasNoServices ? (
                        <NoServices />
                    ) : (
                        <ProfilesWrapper />
                    )}
                </Box>
            </Box>
        </FgHoverContextProvider>
    );
});
ProfilesPage.displayName = 'ProfilesPage';
export default ProfilesPage;
