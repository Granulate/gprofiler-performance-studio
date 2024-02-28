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



import { useCallback, useEffect, useRef, useState } from 'react';

import useOutsideClickHandler from '@/hooks/useOutsideClickHandler';

const searchRegex = (value) => new RegExp(value, 'i');

export const searchWithRegex = (searchValue, searchedArray, getItemSearchProperty) => {
    if (searchValue) {
        try {
            const testRegex = searchRegex(searchValue);
            return searchedArray.filter((row) => {
                return testRegex.test(getItemSearchProperty(row).toString());
            });
        } catch (e) {
            return searchedArray.filter((row) => {
                return getItemSearchProperty(row).includes(searchValue);
            });
        }
    } else {
        return searchedArray;
    }
};

const useTableSearch = (searchRef) => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const searchInputRef = useRef();
    const searchBoxRef = useRef();

    useOutsideClickHandler(searchBoxRef, () => {
        if (!searchText) setShowSearch(false);
    });

    const setOpenSearch = useCallback(() => setShowSearch(true), [setShowSearch]);

    const setCloseSearch = () => {
        setSearchText('');
        setShowSearch(false);
    };

    //after opening search, focus input
    useEffect(() => {
        if (showSearch) {
            const timeout = setTimeout(() => {
                searchInputRef?.current?.focus();
            }, 100);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [showSearch]);
    return {
        tableSearchProps: {
            value: searchText,
            onChange: (event) => setSearchText(event.target.value),
            clearSearch: () => setCloseSearch(),
            visible: showSearch,
            inputRef: searchInputRef,
            boxRef: searchBoxRef,
        },
        searchRegex,
        setOpenSearch,
        searchText,
    };
};

export default useTableSearch;
