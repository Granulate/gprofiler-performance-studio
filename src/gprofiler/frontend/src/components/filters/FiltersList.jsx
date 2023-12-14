{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { useCallback, useContext } from 'react';

import { useFilterDelete } from '../../api/filters/useFilterActions';
import { FILTER_TAGS_ACTIONS, FilterTagsContext } from '../../states/filters/FiltersTagsContext';
import { COLORS } from '../../theme/colors';
import { FILTER_EQUALNESS, FILTER_OPERATIONS, FILTER_TYPES } from '../../utils/filtersUtils';
import Tooltip from '../common/dataDisplay/muiToolTip/Tooltip';
import DropdownSpin from '../common/feedback/DropdownSpin';
import Icon from '../common/icon/Icon';
import { ICONS_NAMES } from '../common/icon/iconsData';
import Flexbox from '../common/layout/Flexbox';
import { FiltersButton, FiltersIconButton } from './styles';

const FiltersList = ({ onFilterClick, filters = [], loading, onClose }) => {
    const { setActiveFilterTag, getSavedFilters, dispatchFilterTags } = useContext(FilterTagsContext);

    const onRemoveExistingFilter = async () => {
        dispatchFilterTags({ type: FILTER_TAGS_ACTIONS.CLEAR });
        getSavedFilters();
    };

    const { deletingFilter, setIdToDelete } = useFilterDelete({ onRemoveExistingFilter });

    const isLoading = deletingFilter || loading;
    const handleApplyClick = useCallback(
        (filter) => {
            setActiveFilterTag(filter);
            onClose();
        },
        [setActiveFilterTag, onClose]
    );

    const handleDeleteClick = useCallback(
        (id) => {
            setIdToDelete(id);
        },
        [setIdToDelete]
    );

    const handleEditClick = useCallback(
        (filter) => {
            onFilterClick(filter);
        },
        [onFilterClick]
    );

    return (
        <Flexbox column spacing={4}>
            {loading ? (
                <DropdownSpin />
            ) : (
                filters.map((currentFilter, FilterIndex) => {
                    const { filter, id } = currentFilter;
                    const [operation, values] = Object.entries(filter)[0];
                    const fullString = values.map((FilterItem, index) => {
                        const [type, subItem] = Object.entries(FilterItem)[0];
                        const [equal, value] = Object.entries(subItem)[0];
                        const currentRuleString = index > 0 ? ` ${FILTER_OPERATIONS[operation]?.display} ` : '';
                        return `${currentRuleString} ${FILTER_TYPES[type]?.display} ${FILTER_EQUALNESS[equal]?.display} ${value}`;
                    });

                    return (
                        <Flexbox spacing={3} key={FilterIndex}>
                            <Tooltip content={fullString} maxWidth={'500px'}>
                                <FiltersButton
                                    sxOverride={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        width: '100%',
                                        display: 'inline-block',
                                        textOverflow: 'ellipsis',
                                        typography: 'body1_lato',
                                    }}
                                    onClick={() => handleApplyClick(currentFilter)}>
                                    {fullString}
                                </FiltersButton>
                            </Tooltip>

                            <FiltersIconButton
                                onClick={() => handleEditClick(currentFilter)}
                                loading={isLoading}
                                tooltipText='Edit'>
                                <Icon color={COLORS.DARK_PURPLE} name={ICONS_NAMES.Edit} />
                            </FiltersIconButton>

                            <FiltersIconButton
                                tooltipText='Delete'
                                onClick={() => handleDeleteClick(id)}
                                loading={isLoading}>
                                <Icon color={COLORS.DARK_PURPLE} name={ICONS_NAMES.Delete} />
                            </FiltersIconButton>
                        </Flexbox>
                    );
                })
            )}
        </Flexbox>
    );
};

export default FiltersList;
