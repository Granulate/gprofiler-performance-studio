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
