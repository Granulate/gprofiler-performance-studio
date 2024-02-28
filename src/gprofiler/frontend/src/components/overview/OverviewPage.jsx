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

import { Box, Skeleton } from '@mui/material';
import _ from 'lodash';
import { useMemo } from 'react';

import { useGetOverviewPageData } from '../../api/hooks/useGetOverviewPageData';
import SkewedButton from '../common/buttons/SkewedButton';
import StatsCard from '../common/dataDisplay/card/StatsCard';
import Flexbox from '../common/layout/Flexbox';
import PageHeader from '../common/layout/PageHeader';
import ServicesTable from './servicesTable/ServicesTable';
import { parseService } from './utils';

const ParagraphSkeleton = ({ rows = 5 }) => (
    <Box sx={{ width: '100%' }}>
        <Skeleton variant='text' width={200} animation='wave' />
        {Array.from(Array(rows - 2).keys()).map((key) => (
            <Skeleton variant='text' animation='wave' key={key} />
        ))}
        <Skeleton variant='text' width={250} animation='wave' />
    </Box>
);

const OverviewPage = () => {
    const { servicesData, servicesLoading } = useGetOverviewPageData();

    const calculatedServices = useMemo(() => {
        if (servicesLoading) {
            return [];
        }
        return _.map(servicesData, (service) => {
            return parseService(service);
        });
    }, [servicesData, servicesLoading]);

    const isLoading = !!servicesLoading;
    return (
        <>
            <PageHeader
                title='Overview'
                leftElement={
                    <SkewedButton href={'https://granulate.tourial.com/ProductTour'} target={'_blank'}>
                        Take our interactive tour
                    </SkewedButton>
                }
            />

            <Flexbox column sx={{ mt: 8, mx: 6, height: '120px' }} spacing={8}>
                {isLoading ? (
                    <Box sx={{ display: 'flex', height: '245px', maxWidth: '1050px' }}>
                        <ParagraphSkeleton rows={8} />
                        <Box sx={{ width: '40px' }} />
                        <ParagraphSkeleton rows={8} />
                    </Box>
                ) : (
                    <StatsCard />
                )}
                {isLoading ? (
                    <>
                        <Box sx={{ height: '15px' }} />
                        <ParagraphSkeleton rows={10} />
                    </>
                ) : (
                    <ServicesTable services={calculatedServices} />
                )}
            </Flexbox>
        </>
    );
};

export default OverviewPage;
