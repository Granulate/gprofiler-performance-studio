

import { InputAdornment, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useDebounceEffect } from 'ahooks';
import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';

import Button from '@/components/common/button/Button';
import Icon from '@/components/common/icon/Icon';
import { ICONS_NAMES } from '@/components/common/icon/iconsData';
import Flexbox from '@/components/common/layout/Flexbox';
import useSearchHotkeyWithAction from '@/hooks/useSearchHotkeyWithAction';
import { SearchContext } from '@/states';
import { SearchIcon } from '@/svg/topPanelIcons';
import { COLORS } from '@/theme/colors';
import { getPercent } from '@/utils/fgUtils';

const ProfilesSearch = ({ placeholder = 'Search', searchRef, disabled = false }) => {
    const { searchValue, setSearchValue } = useContext(SearchContext);
    const { matchAmount, searchResult, ownAmount, totalMatchedAmount, totalOwnAmount } = useContext(SearchContext);

    const succeededSearch = _.isEqual(searchResult, 'success');
    const searchResultInfoText = succeededSearch
        ? `Matched: ${getPercent(matchAmount, totalMatchedAmount)}%.
        Own: ${getPercent(ownAmount, totalOwnAmount)}%`
        : 'Bad Regex';

    const [localSearchValue, setLocalSearchValue] = useState(searchValue);
    const [searchVisible, setSearchVisible] = useState(false);
    useDebounceEffect(
        () => {
            setSearchValue(localSearchValue);
        },
        [localSearchValue],
        { wait: 500 }
    );

    const handleClickSearch = () => {
        if (!searchVisible) {
            setSearchVisible(true);
            setTimeout(() => {
                searchRef?.current?.focus();
            }, 200);
        } else if (!searchValue) {
            setSearchVisible(false);
        } else {
            searchRef?.current?.focus();
        }
    };

    const handleDeleteSearch = () => {
        setSearchValue('');
    };
    useEffect(() => {
        setLocalSearchValue(searchValue);
    }, [searchValue]);
    useSearchHotkeyWithAction(handleClickSearch);

    return (
        <Flexbox
            sx={{ minWidth: searchVisible ? (succeededSearch ? '60%' : '50%') : 'auto' }}
            alignItems='center'
            spacing={2}
            justifyContent='start'>
            <Button iconOnly color='inherit' disabled={disabled} onClick={handleClickSearch}>
                <SearchIcon />
            </Button>
            {searchVisible && (
                <TextField
                    variant='standard'
                    placeholder={placeholder}
                    onChange={(evt) => {
                        setLocalSearchValue(evt.target.value);
                    }}
                    InputProps={{
                        disableUnderline: true,
                        endAdornment: searchValue ? (
                            <InputAdornment position='end'>
                                <Button iconOnly color='inherit' disableRipple onClick={handleDeleteSearch}>
                                    <Icon name={ICONS_NAMES.Close} size={15} color={COLORS.DARK_GREY} />
                                </Button>
                            </InputAdornment>
                        ) : null,
                    }}
                    sx={{ width: '100%', minWidth: '80px' }}
                    value={localSearchValue}
                    disabled={disabled}
                    inputRef={searchRef}
                />
            )}
            {!_.isNil(searchResult) && (
                <Typography variant='body1_lato' sx={{ minWidth: '200px' }}>
                    {searchResultInfoText}
                </Typography>
            )}
        </Flexbox>
    );
};

export default ProfilesSearch;
