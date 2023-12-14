{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { Badge, Popover } from '@mui/material';
import { useContext, useState } from 'react';

import Tooltip from '@/components/common/dataDisplay/muiToolTip/Tooltip';
import Flexbox from '@/components/common/layout/Flexbox';
import { DropDownButton } from '@/components/common/selectors/dropdown/Dropdown';
import { FgContext, SelectorsContext } from '@/states';
import { FilterTagsContext } from '@/states/filters/FiltersTagsContext';
import { FilterIcon } from '@/svg/topPanelIcons';
import { FILTER_EQUALNESS, FILTER_OPERATIONS, FILTER_TYPES } from '@/utils/filtersUtils';

import Filters from '../../../filters/Filters';

const getStringifiedFilters = (activeFilter) => {
    if (!activeFilter) {
        return '';
    }
    const { filter } = activeFilter;
    const [operation, values] = Object.entries(filter)[0];
    const fullString = values.map((FilterItem, index) => {
        const [type, subItem] = Object.entries(FilterItem)[0];
        const [equal, value] = Object.entries(subItem)[0];
        const currentRuleString = index > 0 ? ` ${FILTER_OPERATIONS[operation]?.display} ` : '';
        return `${currentRuleString} ${FILTER_TYPES[type]?.display} ${FILTER_EQUALNESS[equal]?.display} ${value}`;
    });
    return fullString.join();
};

const FilterDropdown = () => {
    const [filtersDropDownAnchorEl, setFiltersDropDownAnchorEl] = useState(null);
    const { isFgDisplayed, isFgLoading } = useContext(FgContext);
    const { areServicesLoading } = useContext(SelectorsContext);
    const { activeFilterTag, activeFiltersCount } = useContext(FilterTagsContext);
    const isFilterDisabled = isFgLoading || areServicesLoading || (!isFgDisplayed && !activeFilterTag);

    return (
        <>
            <Flexbox gap={4} alignItems='center'>
                <Tooltip variant='dark' placement='bottom-start' content={getStringifiedFilters(activeFilterTag)}>
                    <Badge
                        color='primary'
                        sx={{ '& .MuiBadge-badge': { typography: 'body3_lato' } }}
                        overlap='circular'
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={activeFiltersCount}>
                        <DropDownButton
                            open={Boolean(filtersDropDownAnchorEl)}
                            disabled={isFilterDisabled}
                            handleClick={(e) => {
                                setFiltersDropDownAnchorEl(e.currentTarget);
                            }}
                            hideArrow
                            buttonMaxWidth='45px'
                            title={
                                <Flexbox justifyContent='center' alignItems='center'>
                                    <FilterIcon customFill={isFilterDisabled ? 'grey' : undefined} />
                                </Flexbox>
                            }
                        />
                    </Badge>
                </Tooltip>
            </Flexbox>
            <Popover
                PaperProps={{
                    sx: {
                        mt: 1,
                        borderRadius: '8px',
                        width: 740,
                        boxShadow:
                            '0px 50px 92px rgba(0, 0, 0, 0.2), 0px 18.2508px 33.5815px rgba(0, 0, 0, 0.0344991), 0px 8.86044px 16.3032px rgba(0, 0, 0, 0.0278145), 0px 4.34355px 7.99213px rgba(0, 0, 0, 0.0221855), 0px 1.71745px 3.1601px rgba(0, 0, 0, 0.0155009)',
                    },
                }}
                open={Boolean(filtersDropDownAnchorEl)}
                anchorEl={filtersDropDownAnchorEl}
                onClose={() => setFiltersDropDownAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                <Filters onClose={() => setFiltersDropDownAnchorEl(null)} />
            </Popover>
        </>
    );
};

export default FilterDropdown;
