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



import _ from 'lodash';
import { useMemo } from 'react';

import { ordinalSuffixOf } from '@/components/common/dataDisplay/utils';
import Dropdown from '@/components/common/selectors/dropdown/Dropdown';
import { WeightIcon } from '@/svg/topPanelIcons';

import WeightFiltersContainer from './WeightFiltersContainer';

const getWeightFilterText = (weightFilters) => {
    if (100 > weightFilters.percentile && weightFilters.percentile > 0) {
        return `Weight: Top ${ordinalSuffixOf(weightFilters.percentile)} Percentile`;
    }
    if (weightFilters.threshold) {
        return `Weight: ${_.round(weightFilters.threshold, 3)}% - 100%`;
    }
    return 'Weight';
};

const WeightFilterDropdown = ({ hasPercentilesData, weightFilters, disabled }) => {
    const title = useMemo(() => getWeightFilterText(weightFilters), [weightFilters]);
    return (
        <Dropdown title={title} icon={<WeightIcon />} disabled={disabled}>
            <WeightFiltersContainer hidePresets={!hasPercentilesData} />
        </Dropdown>
    );
};
export default WeightFilterDropdown;
