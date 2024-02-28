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
