{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box } from '@mui/material';
import { useContext, useEffect } from 'react';

import { FgContext, FiltersContext, SelectorsContext } from '../../../states';
import { ProcessIcon } from '../../../svg/topPanelIcons';
import { COLORS } from '../../../theme/colors';
import { PROFILES_VIEWS } from '../../../utils/consts';
import Flexbox from '../../common/layout/Flexbox';
import AutoComplete from '../../common/selectors/autoComplete/AutoComplete';
import FilterDropdown from './filters/FilterDropdown';
import WeightFilterDropdown from './filters/weight/WeightFilterDropdown';
import ProfilesActions from './ProfilesActions';
import ServicesSelect from './ServicesSelect';
import TimeRangeSelector from './timeSelection/TimeRangeSelector';

const ProfilesHeader = ({ isGrayedOut = false }) => {
    const { fgOriginData, isFgDisplayed } = useContext(FgContext);
    const { services, selectedService, setSelectedService, viewMode, selectedServiceEnvType } =
        useContext(SelectorsContext);
    const hasPercentilesData = Object.prototype.hasOwnProperty.call(fgOriginData, 'percentiles');
    const {
        filters: { processes: processesFilters, weight: weightFilters },
        setProcessesList,
        setProcessesFilters,
    } = useContext(FiltersContext);

    useEffect(() => {
        if (fgOriginData && Object.prototype.hasOwnProperty.call(fgOriginData, 'children')) {
            setProcessesList(fgOriginData.children.map((process) => ({ label: process.name, value: process.name })));
        }
    }, [fgOriginData, selectedService, setProcessesList]);

    const isServiceView = viewMode === PROFILES_VIEWS.service;

    return (
        <Flexbox
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent='start'
            sx={{ p: 4, zIndex: 3, background: COLORS.ALMOST_WHITE, position: 'relative' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'start',
                    alignItems: 'center',

                    width: '100%',
                    gap: { xs: 1, sm: 2, md: 4 },
                }}>
                <ServicesSelect
                    disabled={isGrayedOut}
                    setSelectedService={setSelectedService}
                    selectedService={selectedService}
                    services={services}
                    selectedServiceEnvType={selectedServiceEnvType}
                />
                {!isServiceView && (
                    <>
                        <AutoComplete
                            icon={<ProcessIcon />}
                            placeholder='Process names'
                            onChange={(listOfCheckedProcesses) => {
                                setProcessesFilters(listOfCheckedProcesses);
                            }}
                            options={processesFilters.processesList.map((el) => el.value)}
                            disabled={isGrayedOut || !isFgDisplayed || isServiceView}
                            selectedOptions={processesFilters.filters}
                            withSelectAll
                        />
                        <WeightFilterDropdown
                            hasPercentilesData={hasPercentilesData}
                            weightFilters={weightFilters}
                            disabled={isGrayedOut || !isFgDisplayed || isServiceView}
                        />
                    </>
                )}
                <TimeRangeSelector disabled={isGrayedOut} dropDownAlign={isServiceView ? 'bottom-start' : undefined} />
            </Box>
            <Flexbox sx={{ height: '42px' }}>
                <FilterDropdown />
                {!isServiceView && <ProfilesActions isGrayedOut={isGrayedOut || isServiceView} />}
            </Flexbox>
        </Flexbox>
    );
};

export default ProfilesHeader;
