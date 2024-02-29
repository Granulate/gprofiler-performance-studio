{
    /*
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
     */
}

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
