{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import _ from 'lodash';

const getValOccurrencesMapping = (ElementsList, predicate) => {
    return ElementsList.reduce((occurrences, currentValue, currentIndex) => {
        const val = predicate(currentValue);
        (occurrences[val] || (occurrences[val] = [])).push(currentIndex);
        return occurrences;
    }, {});
};

const recursivelyMergeFGChildren = (fgElementsList) => {
    const occurrences = getValOccurrencesMapping(fgElementsList, (element) => element.name);
    return Object.keys(occurrences).reduce((mergedChildren, currentElement) => {
        if (occurrences[currentElement].length > 1) {
            const firstElement = fgElementsList[occurrences[currentElement][0]];
            const merged = occurrences[currentElement].reduce(
                (mergedChildren, currentValue) => {
                    mergedChildren.value += fgElementsList[currentValue].value;
                    mergedChildren.children = mergedChildren.children.concat(fgElementsList[currentValue].children);
                    return mergedChildren;
                },
                {
                    name: currentElement,
                    type: firstElement.type,
                    value: 0,
                    children: [],
                }
            );
            merged.children = recursivelyMergeFGChildren(merged.children);
            mergedChildren.push(merged);
        } else {
            mergedChildren.push(fgElementsList[occurrences[currentElement][0]]);
        }
        return mergedChildren;
    }, []);
};

const recursivelyMergeFGParents = (parents, tableMappingData, prevParentsValList) => {
    //occurrences: dict of key (name of a node in 'parents'), and value (the indexes of the nodes with the same key name in 'parents')
    const parentsNamesOccurrences = getValOccurrencesMapping(parents, (element) => element.name);
    return getMergedParents(
        Object.keys(parentsNamesOccurrences),
        parentsNamesOccurrences,
        parents,
        prevParentsValList,
        tableMappingData
    );
};

const getMergedParents = (parentsNames, parentsNamesOccurrences, parents, prevParentsValList, tableMappingData) => {
    return parentsNames.reduce((mergedParents, currentNodeName) => {
        let parentsValues = [];
        const firstElement = parents[parentsNamesOccurrences[currentNodeName][0]];
        const merged = parentsNamesOccurrences[currentNodeName].reduce(
            (mergedParents, currentIndex) => {
                mergedParents.value += prevParentsValList[currentIndex];
                if (tableMappingData[currentNodeName].parents.length > 0) {
                    const parentsOfParents = getParentsOfParents(
                        parents,
                        parentsValues,
                        prevParentsValList,
                        tableMappingData,
                        currentNodeName,
                        currentIndex
                    );
                    mergedParents.parents = mergedParents.parents.concat(parentsOfParents);
                }
                return mergedParents;
            },
            {
                name: currentNodeName,
                type: firstElement.type,
                value: 0,
                parents: [],
            }
        );
        merged.children =
            merged.parents.length === 0
                ? []
                : recursivelyMergeFGParents(merged.parents, tableMappingData, parentsValues);
        mergedParents.push(merged);
        return mergedParents;
    }, []);
};

const getParentsOfParents = (
    parents,
    parentsValues,
    prevParentsValList,
    tableMappingData,
    currentNodeName,
    currentIndex
) => {
    return tableMappingData[currentNodeName].occurrences.reduce((result, parentOfParentOcc, occIndex) => {
        if (parentOfParentOcc === parents[currentIndex]) {
            //if the reference of the current node (parents[currentValue]) is the same as the reference in the occurrence list (from the table), than it's the same node
            result.push(tableMappingData[currentNodeName].parents[occIndex]);
            const parentValue = _.min([
                prevParentsValList[currentIndex],
                tableMappingData[currentNodeName].occurrences[occIndex].value,
            ]); //the value of the parent should be as the relative part of its child (it's child value)
            parentsValues.push(parentValue);
        }
        return result;
    }, []);
};

const getCallsFlameGraph = (tableViewDataElement) => {
    return recursivelyMergeFGChildren(tableViewDataElement.occurrences)[0];
};

const getCalledByFlameGraph = (tableViewDataElement, tableMappingData) => {
    const occValues = _.map(tableViewDataElement.occurrences, (elm) => elm.value);
    const totalSamples = _.sum(occValues);
    return {
        name: tableViewDataElement.function,
        value: totalSamples,
        type: tableViewDataElement.occurrences[0].type,
        children: recursivelyMergeFGParents(
            tableMappingData[tableViewDataElement.function].parents, //use this so it's the same pointer
            tableMappingData,
            occValues
        ),
    };
};

export { getCalledByFlameGraph, getCallsFlameGraph };
