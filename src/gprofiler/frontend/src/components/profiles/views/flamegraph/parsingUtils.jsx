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

import { STACK_TYPES } from '@/utils/filtersUtils';

// iterate over the flamegraph data and changes its structure to fit the fg lib.
// - start is relative to the amount of total sample and the node parent, and defined by samples count (value)
// - duration is the sample count of the node
// we take the whole sample count (which is part of root proccess) and define it as our total duration.
export const parseFlamegraphData = (
    flamegraphObject,
    start = 0,
    level = 0,
    alwaysMatch = false,
    initAppid = false,
    mines = [],
    parentIsMine = false
) => {
    const { matched, value: duration, name, children, type, specialType } = flamegraphObject;

    const currentName = name || 'unknown';

    const isMine = parentIsMine || checkIfMine({ start, duration, level }, mines);
    return {
        name: currentName,
        start,
        level: level,
        duration,
        matched: alwaysMatch || matched,
        type,
        specialType: isMine ? STACK_TYPES.mine : initAppid && level === 1 ? STACK_TYPES.Appid : specialType,
        children:
            children?.length > 0
                ? children.map((child, index) => {
                      const currentPosition = children
                          .slice(0, index) //get the range
                          .reduce((total, child) => total + (child.value || 0), 0); //sum up

                      return parseFlamegraphData(
                          child,
                          start + currentPosition,
                          level + 1,
                          alwaysMatch,
                          initAppid,
                          mines,
                          isMine
                      );
                  })
                : [],
    };
};

export const checkIfMine = ({ start, duration, level }, mines) => {
    return mines.some((mine) => mine?.level === level && mine?.start === start && mine?.duration === duration);
};

export const addOrRemoveNodeFromArray = (array, node) => {
    const { level, start, duration } = node;
    const foundIndex = array.findIndex(
        (currNode) => currNode.level === level && currNode.start === start && currNode.duration === duration
    );
    if (foundIndex > -1) {
        const newArr = [...array];
        newArr.splice(foundIndex, 1);
        return newArr;
    } else {
        return [...array, { level, start, duration }];
    }
};
