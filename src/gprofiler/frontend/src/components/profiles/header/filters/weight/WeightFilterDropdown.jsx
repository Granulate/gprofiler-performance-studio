{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
