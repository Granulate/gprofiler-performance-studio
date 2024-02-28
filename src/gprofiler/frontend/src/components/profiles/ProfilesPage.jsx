

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
