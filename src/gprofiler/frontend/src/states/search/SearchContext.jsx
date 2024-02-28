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
import { createContext, useRef, useState } from 'react';

import useSearchQueryParams from '../../hooks/useSearchQueryParams';
import { specialTypesKeys, specialTypesKeysToRealTypes } from '../../utils/filtersUtils';

export const SearchContext = createContext();

const typeRegex = new RegExp(/^type:/gm, 'i');

export const returnTypeSearchIfMatches = (value) => {
    if (value.length > 5 && typeRegex.test(value)) {
        const type = value.substring(5);
        const isTypeMatches = specialTypesKeys.find((element) => element === type);
        if (isTypeMatches) {
            return specialTypesKeysToRealTypes[type];
        }
    }
    return false;
};

const parseNodesTree = ({ functionCall, node, value, isSearchByType, regex, matched, didFail }) => {
    return {
        ...node,
        children: node.children.map((child) => functionCall(child, value, isSearchByType, regex, didFail)),
        matched,
    };
};

export const highlightColorsBySearchKeyword = (node, value, isSearchByType, premadeRegex, didFail) => {
    if (didFail) {
        return parseNodesTree({
            functionCall: highlightColorsBySearchKeyword,
            node,
            value,
            regex: null,
            matched: false,
            didFail: true,
        });
    }
    try {
        const regex = premadeRegex || new RegExp(value, 'i');
        const matched = isSearchByType ? node.specialType === isSearchByType : regex.test(node.name);
        return parseNodesTree({
            functionCall: highlightColorsBySearchKeyword,
            node,
            value,
            isSearchByType,
            regex,
            matched,
            didFail: false,
        });
    } catch (e) {
        return parseNodesTree({
            functionCall: highlightColorsBySearchKeyword,
            node,
            value,
            isSearchByType,
            regex: null,
            matched: false,
            didFail: true,
        });
    }
};

/*For each search phrase, the function calculates the total time and the own time.
when calculating total time upon reaching the node, it stops there and does not calculate the children (by setting isParentNodeMatch to true).
Own time is calculated by summing up all the occasions including the children.
*/
export const countZoomedSearchMatches = (node, value, isSearchByType, premadeRegex, isParentNodeMatch = false) => {
    const regexValue = premadeRegex || new RegExp(value, 'i');
    const isNodeMatch = isSearchByType ? node.specialType === isSearchByType : regexValue.test(node.name);
    let matchAmount = 0;
    let ownAmount = 0;

    /* The samples of each node arrive from the Backend as 'value' key which is converted to 'duration' key in the ֿ
    Frontend (for the flamegraph UI library we use).
    In some cases the search function runs before the 'value' key is converted to 'duration'.
    */
    const duration = node.value || node.duration;

    if (_.isEmpty(node.children)) {
        matchAmount = isNodeMatch && !isParentNodeMatch ? duration : 0;
        ownAmount = isNodeMatch ? duration : 0;
        return { matchAmount, ownAmount };
    }
    if (isNodeMatch) {
        ownAmount = duration - _.sumBy(node.children, (child) => child.value || child.duration);
        matchAmount = isParentNodeMatch ? 0 : duration;
        isParentNodeMatch = true;
    }
    const initValues = { matchAmount, ownAmount };
    return _.reduce(
        node.children,
        (result, child) => {
            const current = countZoomedSearchMatches(
                child,
                regexValue,
                isSearchByType,
                premadeRegex,
                isParentNodeMatch
            );
            result.matchAmount += current.matchAmount;
            result.ownAmount += current.ownAmount;
            return result;
        },
        initValues
    );
};

export const SearchProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState('');
    const [matchAmount, setMatchAmount] = useState(0);
    const [ownAmount, setOwnAmount] = useState(0);
    const [searchResult, setSearchResult] = useState();
    const [totalMatchedAmount, setTotalMatchedAmount] = useState(0);
    const [totalOwnAmount, setTotalOwnAmount] = useState(0);
    const searchRef = useRef(null);

    useSearchQueryParams({ searchValue, setSearchValue });

    return (
        <SearchContext.Provider
            value={{
                searchValue,
                setSearchValue,
                setOwnAmount,
                ownAmount,
                matchAmount,
                setMatchAmount,
                searchResult,
                setSearchResult,
                searchRef,
                totalMatchedAmount,
                setTotalMatchedAmount,
                totalOwnAmount,
                setTotalOwnAmount,
            }}>
            {children}
        </SearchContext.Provider>
    );
};
