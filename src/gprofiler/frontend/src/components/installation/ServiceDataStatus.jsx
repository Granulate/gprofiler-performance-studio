{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box } from '@mui/material';
import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { SelectorsContext } from '@/states';

import useGetServicesDataStatus from '../../api/hooks/useGetServicesDataStatus';
import Button from '../../components/common/button/Button';
import { COLORS } from '../../theme/colors';
import { EXTERNAL_URLS, PAGES } from '../../utils/consts';
import Icon from '../common/icon/Icon';
import { ArrowRightIcon } from '../common/icon/Icons';
import { ICONS_NAMES } from '../common/icon/iconsData';
import Flexbox from '../common/layout/Flexbox';

const searchServiceInServices = (serviceName, services) => !!_.find(services, { name: serviceName });

const ServiceDataStatus = ({ serviceName }) => {
    const [isServiceExist, setServiceExist] = useState(false);

    const { setSelectedService } = useContext(SelectorsContext);
    const history = useHistory();
    const location = useLocation();

    const { services } = useGetServicesDataStatus();

    useEffect(() => {
        if (services?.length > 0) {
            setServiceExist(searchServiceInServices(serviceName, services));
        }
    }, [services, serviceName]);

    const redirectToService = (currentServiceName) => {
        history.push({ pathname: PAGES.profiles.to, search: location.search });
        setSelectedService(currentServiceName);
    };

    return (
        <>
            {isServiceExist && (
                <Flexbox
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{ backgroundColor: COLORS.BLUE_9, borderRadius: '5px', p: '14px 20px' }}>
                    <Box sx={{ color: 'white.main' }}>
                        Profiling data has arrived from service {serviceName} <br />
                        Go to Profiles page and select the service or press here to start investigating
                    </Box>
                    <Button iconOnly color='primary' onClick={() => redirectToService(serviceName)}>
                        <ArrowRightIcon color='white' />
                    </Button>
                </Flexbox>
            )}

            <Flexbox justifyContent='flex-end'>
                <Button
                    href={EXTERNAL_URLS.documentation.to}
                    variant='text'
                    underline
                    sx={{ mt: 3 }}
                    startIcon={<Icon name={ICONS_NAMES.Documentation} color={COLORS.PRIMARY_PURPLE} />}>
                    See Documentation
                </Button>
            </Flexbox>
        </>
    );
};

export default ServiceDataStatus;
