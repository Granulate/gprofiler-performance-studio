{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, Grid } from '@mui/material';
import { useContext, useEffect } from 'react';

import { FgContext, FiltersContext, SelectorsContext } from '../../../states';
import Flexbox from '../../common/layout/Flexbox';
import SelectWithTitle from '../../common/selectors/select/SelectWithTitle';
import ServicesSelect from '../../profiles/header/ServicesSelect';
import TimeRangeSelector from '../../profiles/header/timeSelection/TimeRangeSelector';
import ComparisonMetricsTable from './ComparisonMetricsTable';

const ComparisonHeader = ({
    isGrayedOut = false,
    compareTimeSelection,
    setCompareTimeSelection,
    compareSamples,
    isDataLoading,
    isCompareDataLoading,
    compareService,
    setCompareService,
}) => {
    const { fgOriginData } = useContext(FgContext);
    const { services, selectedService, setSelectedService, selectedServiceEnvType } = useContext(SelectorsContext);
    const { setProcessesList } = useContext(FiltersContext);

    useEffect(() => {
        if (fgOriginData && Object.prototype.hasOwnProperty.call(fgOriginData, 'children')) {
            setProcessesList(fgOriginData.children.map((process) => ({ label: process.name, value: process.name })));
        }
    }, [fgOriginData, selectedService, setProcessesList]);

    return (
        <Grid container spacing={2} sx={{ backgroundColor: 'fieldBlue.main' }}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Flexbox
                    column
                    spacing={1}
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{
                        p: 4,
                        zIndex: 1,
                        flexGrow: 1,
                    }}>
                    <Box sx={{ width: '100%' }}>
                        <ServicesSelect
                            disabled={isGrayedOut}
                            setSelectedService={setSelectedService}
                            selectedService={selectedService}
                            services={services}
                            selectedServiceEnvType={selectedServiceEnvType}
                        />
                    </Box>

                    <SelectWithTitle title='Base time frame'>
                        <TimeRangeSelector disabled={isGrayedOut} dropDownAlign='bottom-start' />
                    </SelectWithTitle>
                    <SelectWithTitle title='Compared time frame'>
                        <TimeRangeSelector
                            disabled={isCompareDataLoading || isGrayedOut}
                            isCustom
                            customTimeSelection={compareTimeSelection}
                            setCustomTimeSelection={setCompareTimeSelection}
                            dropDownAlign='bottom-start'
                        />
                    </SelectWithTitle>
                </Flexbox>
            </Grid>
            <Grid
                item
                xs={12}
                md={8}
                sx={{
                    backgroundColor: 'fieldBlue.main',
                }}>
                <Flexbox
                    column
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    justifyContent='space-between'
                    sx={{
                        p: 4,
                        zIndex: 1,
                        maxWidth: '670px',
                    }}>
                    <ServicesSelect
                        disabled={isGrayedOut}
                        setSelectedService={setCompareService}
                        selectedService={compareService}
                        services={services}
                        selectedServiceEnvType={selectedServiceEnvType}
                    />
                    <ComparisonMetricsTable
                        compareTimeSelection={compareTimeSelection}
                        baseSamples={fgOriginData?.value}
                        compareSamples={compareSamples}
                        compareService={compareService}
                        isDataLoading={isDataLoading}
                        isCompareDataLoading={isCompareDataLoading}
                    />
                </Flexbox>
            </Grid>
        </Grid>
    );
};

export default ComparisonHeader;