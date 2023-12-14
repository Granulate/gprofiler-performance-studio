{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
