{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Box, Tab, Tabs, Typography } from '@mui/material';
import _ from 'lodash';
import { useCallback, useContext, useState } from 'react';

import useGetFilterValueOptions from '../../api/filters/useGetFilterValueOptions';
import { SelectorsContext } from '../../states';
import { FILTER_TAGS_ACTIONS, FilterTagsContext } from '../../states/filters/FiltersTagsContext';
import { EditorIcon, SavedIcon } from '../common/icon/svgIcons';
import Flexbox from '../common/layout/Flexbox';
import FiltersList from './FiltersList';
import FilterForm from './form/FilterForm';

const FILTER_MENU_TABS = { editor: 0, saved: 1 };

const Filters = ({ onClose }) => {
    const [tab, setTab] = useState(0);

    const { selectedService } = useContext(SelectorsContext);
    const { savedFilters, getSavedFilters, savedFiltersLoading, dispatchFilterTags } = useContext(FilterTagsContext);

    const onFilterClick = (filter) => {
        if (filter) {
            dispatchFilterTags({ type: FILTER_TAGS_ACTIONS.SET, payload: filter });
            setTab(FILTER_MENU_TABS.editor);
        }
    };

    const postCreateCallback = useCallback(() => {
        getSavedFilters();
        setTab(FILTER_MENU_TABS.saved);
        dispatchFilterTags({ type: FILTER_TAGS_ACTIONS.CLEAR });
    }, [dispatchFilterTags, getSavedFilters]);

    const handleChangeTab = useCallback((e, newTab) => setTab(newTab), [setTab]);

    const { valueOptions, valueOptionsLoading } = useGetFilterValueOptions();

    return (
        <Flexbox column sx={{ p: 5 }} spacing={4}>
            <Box>
                <Typography variant='subtitle2_lato'>Filters For </Typography>
                <Typography variant='subtitle1_lato'>{selectedService}</Typography>
            </Box>

            <Tabs sx={{ color: 'plainGrey.main', minHeight: 0 }} value={tab} onChange={handleChangeTab}>
                <Tab
                    disableRipple
                    sx={{ p: 0, pb: 2, minHeight: 0, minWidth: 0, width: 95, typography: 'body1_lato' }}
                    iconPosition='start'
                    icon={<EditorIcon />}
                    label='Editor'
                />
                <Tab
                    disableRipple
                    disabled={!savedFilters || _.isEmpty(savedFilters)}
                    sx={{ p: 0, pb: 2, minHeight: 0, minWidth: 0, width: 95, typography: 'body1_lato' }}
                    iconPosition='start'
                    icon={<SavedIcon />}
                    label={`Saved (${savedFilters?.length || 0})`}
                />
            </Tabs>
            {tab === FILTER_MENU_TABS.editor && (
                <FilterForm
                    onClose={onClose}
                    postCreateCallback={postCreateCallback}
                    valueOptions={valueOptions}
                    valueOptionsLoading={valueOptionsLoading}
                />
            )}
            {tab === FILTER_MENU_TABS.saved && (
                <FiltersList
                    onClose={onClose}
                    loading={savedFiltersLoading}
                    filters={savedFilters}
                    onFilterClick={onFilterClick}
                />
            )}
        </Flexbox>
    );
};

export default Filters;
