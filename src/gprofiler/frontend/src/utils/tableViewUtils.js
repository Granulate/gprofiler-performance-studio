{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

export const getFunctioNameEdges = (functionName, coreFunctionName) => {
    const coreFunctionIndex = functionName.indexOf(coreFunctionName);
    const coreFunctionLength = coreFunctionName.length;

    const nameStart = functionName.substring(0, coreFunctionIndex);
    const nameEnd = functionName.substring(coreFunctionIndex + coreFunctionLength, functionName.length);
    return { start: nameStart, end: nameEnd };
};
