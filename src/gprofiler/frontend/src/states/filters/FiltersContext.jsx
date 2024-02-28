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
import { createContext, useCallback, useReducer } from 'react';

import useFiltersQueryParams from '../../hooks/useFiltersQueryParams';
import { getRuntimesList } from '../../utils/filtersUtils';
import initialState from './initialState';

export const FiltersContext = createContext();

const RESET_PROCESS_FILTERS = 'RESET_PROCESS_FILTERS';
const SET_PROCESSES_LIST = 'SET_PROCESSES_LIST';
const SET_PROCESSES_FILTERS = 'SET_PROCESSES_FILTERS';
const SET_RUNTIME_FILTERS = 'SET_RUNTIME_FILTERS';
const TOGGLE_RUNTIME_FILTER = 'TOGGLE_RUNTIME_FILTER';
const TOGGLE_RUNTIME_MIXED_STACKS_MODE = 'TOGGLE_RUNTIME_MIXED_STACKS_MODE';
const RESET_RUNTIME_FILTERS = 'RESET_RUNTIME_FILTERS';
const SET_WEIGHT_THRESHOLD = 'SET_WEIGHT_THRESHOLD';
const SET_WEIGHT_PERCENTILE = 'SET_WEIGHT_PERCENTILE';
const RESET_WEIGHT_FILTERS = 'RESET_WEIGHT_FILTERS';

const reducer = (state = [], action) => {
    if (action.type === TOGGLE_RUNTIME_MIXED_STACKS_MODE) {
        return {
            ...state,
            runtime: {
                ...state.runtime,
                isMixedRuntimeStacksModeEnabled: !state.runtime.isMixedRuntimeStacksModeEnabled,
            },
        };
    }

    if (action.type === RESET_PROCESS_FILTERS) {
        return {
            ...state,
            processes: {
                ...state.processes,
                filters: [],
            },
        };
    }

    if (action.type === SET_PROCESSES_LIST) {
        return {
            ...state,
            processes: {
                ...state.processes,
                processesList: action.payload.processesList,
            },
        };
    }

    if (action.type === SET_PROCESSES_FILTERS) {
        return {
            ...state,
            processes: {
                ...state.processes,
                filters: action.payload.filters,
            },
        };
    }

    if (action.type === SET_RUNTIME_FILTERS) {
        const { filters } = action.payload;
        return {
            ...state,
            runtime: {
                ...state.runtime,
                filters,
            },
        };
    }

    if (action.type === TOGGLE_RUNTIME_FILTER) {
        const { filterName } = action.payload;
        let filters = [...state.runtime.filters];
        const index = filters.indexOf(filterName);

        if (index === -1) {
            filters.push(filterName);
        } else if (filters.length === 1) {
            filters = getRuntimesList().map((item) => item.name);
        } else if (filters.length === state.runtime.allRuntimes.length) {
            filters = [filterName];
        } else {
            filters.splice(index, 1);
        }

        if (filters.length === 0) {
            filters = state.runtime.allRuntimes.map((item) => item.name);
        }

        return {
            ...state,
            runtime: {
                ...state.runtime,
                filters,
            },
        };
    }

    if (action.type === RESET_RUNTIME_FILTERS) {
        return {
            ...state,
            runtime: {
                ...state.runtime,
                filters: getRuntimesList().map((item) => item.name),
            },
        };
    }

    if (action.type === SET_WEIGHT_THRESHOLD) {
        return {
            ...state,
            weight: {
                ...state.weight,
                threshold: action.payload.threshold,
            },
        };
    }

    if (action.type === SET_WEIGHT_PERCENTILE) {
        return {
            ...state,
            weight: {
                ...state.weight,
                percentile: action.payload.percentile,
            },
        };
    }

    if (action.type === RESET_WEIGHT_FILTERS) {
        return {
            ...state,
            weight: { ...initialState.weight },
        };
    }

    return state;
};

export const FiltersProvider = ({ children }) => {
    const [filters, dispatch] = useReducer(reducer, initialState);

    const resetProcessFilters = useCallback(() => {
        dispatch({
            type: RESET_PROCESS_FILTERS,
        });
    }, [dispatch]);

    const setProcessesList = useCallback(
        (processesList) => {
            dispatch({
                type: SET_PROCESSES_LIST,
                payload: {
                    processesList,
                },
            });
        },
        [dispatch]
    );

    const setProcessesFilters = useCallback(
        (filters) => {
            dispatch({
                type: SET_PROCESSES_FILTERS,
                payload: {
                    filters,
                },
            });
        },
        [dispatch]
    );

    const setRuntimeFilters = useCallback(
        (filters) => {
            dispatch({
                type: SET_RUNTIME_FILTERS,
                payload: {
                    filters,
                },
            });
        },
        [dispatch]
    );

    const toggleRuntimeFilter = useCallback(
        (filterName) => {
            dispatch({
                type: TOGGLE_RUNTIME_FILTER,
                payload: {
                    filterName,
                },
            });
        },
        [dispatch]
    );

    const resetRuntimeFilters = useCallback(() => {
        dispatch({
            type: RESET_RUNTIME_FILTERS,
        });
    }, [dispatch]);

    const setIsMixedRuntimeStacksModeEnabled = useCallback(() => {
        dispatch({
            type: TOGGLE_RUNTIME_MIXED_STACKS_MODE,
        });
    }, [dispatch]);

    const isRuntimeFilterActive = useCallback(
        (runtimeName) => {
            return _.includes(filters.runtime.filters, runtimeName);
        },
        [filters]
    );

    const setWeightThreshold = useCallback(
        (threshold) => {
            dispatch({
                type: SET_WEIGHT_THRESHOLD,
                payload: {
                    threshold,
                },
            });
        },
        [dispatch]
    );

    const setWeightPercentile = useCallback(
        (percentile) => {
            dispatch({
                type: SET_WEIGHT_PERCENTILE,
                payload: {
                    percentile,
                },
            });
        },
        [dispatch]
    );

    const resetWeightFilters = useCallback(() => {
        dispatch({
            type: RESET_WEIGHT_FILTERS,
        });
    }, [dispatch]);

    useFiltersQueryParams({
        filters,
        setRuntimeFilters,
        setProcessesFilters,
        setWeightPercentile,
        setWeightThreshold,
        setIsMixedRuntimeStacksModeEnabled,
    });

    return (
        <FiltersContext.Provider
            value={{
                filters,
                setProcessesFilters,
                resetProcessFilters,
                setProcessesList,
                toggleRuntimeFilter,
                resetRuntimeFilters,
                setIsMixedRuntimeStacksModeEnabled,
                isRuntimeFilterActive,
                setWeightThreshold,
                setWeightPercentile,
                resetWeightFilters,
            }}>
            {children}
        </FiltersContext.Provider>
    );
};
