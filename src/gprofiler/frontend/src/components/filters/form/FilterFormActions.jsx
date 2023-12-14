{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Typography } from '@mui/material';
import { useCallback, useContext, useMemo, useState } from 'react';

import useFiltersActions from '../../../api/filters/useFilterActions';
import { FILTER_TAGS_ACTIONS, FilterTagsContext } from '../../../states/filters/FiltersTagsContext';
import { COLORS } from '../../../theme/colors';
import Icon from '../../common/icon/Icon';
import { ICONS_NAMES } from '../../common/icon/iconsData';
import Flexbox from '../../common/layout/Flexbox';
import { FiltersButton } from '../styles';

const validateFilter = (filter) => {
    const [operation, rules] = Object.entries(filter.filter)[0];

    const areFiltersValid =
        operation &&
        rules.length > 0 &&
        rules.every((rule) => {
            const [type, subRule] = Object.entries(rule)[0];
            if (type && subRule) {
                const [equal, value] = Object.entries(subRule)[0];
                return !!(equal && value);
            } else {
                return false;
            }
        });
    return areFiltersValid;
};

const FilterFormActions = ({ postCreateCallback, onClose }) => {
    const { filter, dispatchFilterTags, setActiveFilterTag, activeFilterTag } = useContext(FilterTagsContext);

    const isFormValid = useMemo(() => validateFilter(filter), [filter]);

    const [loading, setLoading] = useState(false);

    const { savingFilter, saveFilterError, saveFilter, editingFilter, editFilterError, editFilter } = useFiltersActions(
        { filter }
    );

    const onSaveFilterClick = async () => {
        setLoading(true);
        if (filter?.id) {
            editFilter();
        } else {
            saveFilter();
        }
        setLoading(false);
        setTimeout(() => postCreateCallback(), 1000);
    };

    const shouldDisable = !isFormValid || savingFilter || editingFilter || loading;

    const handleClear = () => {
        dispatchFilterTags({ type: FILTER_TAGS_ACTIONS.CLEAR });
    };

    const onAddFilterClick = () => {
        if (isFormValid) {
            dispatchFilterTags({ type: FILTER_TAGS_ACTIONS.ADD });
        }
    };

    const handleApplyClick = useCallback(() => {
        onClose();
        setActiveFilterTag(filter);
    }, [filter, onClose, setActiveFilterTag]);

    const handleDeactivateClick = useCallback(() => {
        onClose();
        setActiveFilterTag(undefined);
    }, [onClose, setActiveFilterTag]);

    return (
        <Flexbox alignItems='center' justifyContent='space-between'>
            <Flexbox alignItems='center' spacing={3}>
                <FiltersButton
                    disabled={!isFormValid}
                    startIcon={
                        <Icon color={isFormValid ? COLORS.PRIMARY_PURPLE : COLORS.GREY_1} name={ICONS_NAMES.Plus} />
                    }
                    onClick={onAddFilterClick}>
                    Add rule
                </FiltersButton>
                <FiltersButton
                    startIcon={<Icon color={COLORS.PRIMARY_PURPLE} name={ICONS_NAMES.Eraser} />}
                    onClick={handleClear}>
                    Clear
                </FiltersButton>
            </Flexbox>
            <Flexbox alignItems='center' spacing={3}>
                <Typography variant='body2_lato' color='error'>
                    {saveFilterError?.toString() || editFilterError?.toString()}
                </Typography>

                <FiltersButton
                    disabled={shouldDisable}
                    startIcon={
                        <Icon
                            color={shouldDisable ? COLORS.GREY_1 : COLORS.PRIMARY_PURPLE}
                            name={ICONS_NAMES.Bookmark}
                        />
                    }
                    onClick={onSaveFilterClick}>
                    Save
                </FiltersButton>
                {activeFilterTag && (
                    <FiltersButton cta disabled={!activeFilterTag} onClick={handleDeactivateClick}>
                        Remove active
                    </FiltersButton>
                )}

                <FiltersButton cta disabled={!isFormValid} onClick={handleApplyClick}>
                    Apply
                </FiltersButton>
            </Flexbox>
        </Flexbox>
    );
};

export default FilterFormActions;
