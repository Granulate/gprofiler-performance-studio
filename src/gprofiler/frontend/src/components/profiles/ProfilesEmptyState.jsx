

import { Box, Typography } from '@mui/material';
import _ from 'lodash';
import { useContext, useMemo } from 'react';

import { getTimeDiffByUnit, TIME_UNITS } from '@/utils/datetimesUtils';

import FgCollectingData from '../../img/fg-collecting-data.gif';
import { FgContext, SelectorsContext } from '../../states';
import { NoDataIllustration } from '../../svg';
import ErrorIllustration from '../../svg/error-page-view.svg';
import Flexbox from '../common/layout/Flexbox';

const COLLECTING_TIME = 15;

const ProfilesEmptyState = ({ errorMessage = '' }) => {
    const { services, selectedService } = useContext(SelectorsContext);
    const { isFGEmpty } = useContext(FgContext);

    const isCollectingData = useMemo(() => {
        const currentService = _.find(services, (service) => service.name === selectedService);
        const serviceCreatedDate = new Date(_.get(currentService, 'create_date'));
        return getTimeDiffByUnit(new Date(), serviceCreatedDate, TIME_UNITS.minutes) <= COLLECTING_TIME;
    }, [selectedService, services]);

    const isServerError = !!errorMessage;

    return (
        <Flexbox column spacing={2} alignItems='center' sx={{ height: '65vh' }}>
            <Box sx={{ mt: 12 }}>
                {isServerError ? (
                    <img src={ErrorIllustration} alt='Error' style={{ width: '100%' }} />
                ) : isCollectingData ? (
                    <img src={FgCollectingData} alt='Collecting profiling data' />
                ) : (
                    <NoDataIllustration />
                )}
            </Box>
            <Typography variant='h3_lato' sx={{ pb: 5, color: 'grey.dark' }}>
                {isServerError
                    ? 'Oops, something failed…'
                    : isCollectingData
                    ? 'Collecting profiling data'
                    : isFGEmpty
                    ? 'No data was found for the selected filter'
                    : 'No data was found for the selected timeframe'}
            </Typography>
            <Typography variant='h2_lato' sx={{ whiteSpace: 'pre-line', textAlign: 'center', color: 'grey.dark' }}>
                {isServerError
                    ? 'Try refreshing the page.'
                    : isCollectingData
                    ? 'Your data will be available in a few minutes.'
                    : isFGEmpty
                    ? ''
                    : 'Please resume profiling, \n\r or switch the time frame to show historical data.'}
            </Typography>
        </Flexbox>
    );
};

export default ProfilesEmptyState;
