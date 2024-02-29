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
