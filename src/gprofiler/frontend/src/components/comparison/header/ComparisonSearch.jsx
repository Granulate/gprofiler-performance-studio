{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import TextField from '@mui/material/TextField';
import { useDebounceEffect } from 'ahooks';
import { useContext, useEffect, useState } from 'react';

import Icon from '../../../components/common/icon/Icon';
import { ICONS_NAMES } from '../../../components/common/icon/iconsData';
import useSearchHotkey from '../../../hooks/useSearchHotkey';
import { SearchContext } from '../../../states';
import { COLORS } from '../../../theme/colors';
import Button from '../../common/button/Button';
import Flexbox from '../../common/layout/Flexbox';

const ComparisonSearch = ({ placeholder = 'Search', disabled = false }) => {
    const { searchValue, setSearchValue } = useContext(SearchContext);
    const { searchRef } = useContext(SearchContext);

    const [localSearchValue, setLocalSearchValue] = useState(searchValue);

    useSearchHotkey(searchRef);

    useDebounceEffect(
        () => {
            setSearchValue(localSearchValue);
        },
        [localSearchValue],
        { wait: 500 }
    );

    const handleClickSearch = () => {
        searchRef?.current?.focus();
    };

    useEffect(() => {
        setLocalSearchValue(searchValue);
    }, [searchValue]);

    return (
        <Flexbox sx={{ width: '100%' }} alignItems='center' spacing={2} justifyContent='start'>
            <Button iconOnly color='inherit' disabled={disabled} disableRipple onClick={handleClickSearch}>
                <Icon
                    name={ICONS_NAMES.Magnifier}
                    size={30}
                    color={disabled ? COLORS.ALMOST_WHITE : COLORS.BLACK}
                    hoverColor={disabled ? COLORS.ALMOST_WHITE : COLORS.BLUE}
                />
            </Button>
            <TextField
                variant='standard'
                placeholder={placeholder}
                onChange={(evt) => {
                    setLocalSearchValue(evt.target.value);
                }}
                InputProps={{
                    disableUnderline: true,
                    type: 'search',
                }}
                sx={{ width: '100%' }}
                value={localSearchValue}
                disabled={disabled}
                inputRef={searchRef}
            />
        </Flexbox>
    );
};

export default ComparisonSearch;
