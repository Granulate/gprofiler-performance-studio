

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
