{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
