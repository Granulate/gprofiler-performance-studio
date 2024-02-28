

import { useContext } from 'react';

import { FiltersContext } from '@/states/filters/FiltersContext';

import LegendBox from './LegendBox';

const LegendBoxContainer = ({ isResetHidden = false, disabled = false }) => {
    const {
        filters,
        toggleRuntimeFilter,
        resetRuntimeFilters,
        isRuntimeFilterActive,
        setIsMixedRuntimeStacksModeEnabled,
    } = useContext(FiltersContext);
    const areAllRuntimeFilterEnabled = filters.runtime.filters.length === filters.runtime.allRuntimes.length;
    return (
        <LegendBox
            areAllRuntimeFilterEnabled={areAllRuntimeFilterEnabled}
            isResetHidden={isResetHidden}
            runtimeFilters={filters.runtime.allRuntimes}
            isMixedRuntimeStacksModeEnabled={filters.runtime.isMixedRuntimeStacksModeEnabled}
            setIsMixedRuntimeStacksModeEnabled={setIsMixedRuntimeStacksModeEnabled}
            isRuntimeFilterActive={isRuntimeFilterActive}
            toggleRuntimeFilter={toggleRuntimeFilter}
            resetRuntimeFilters={resetRuntimeFilters}
            disabled={disabled}
        />
    );
};
export default LegendBoxContainer;
