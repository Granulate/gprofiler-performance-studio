{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

const toFixedNumber = (num) => parseFloat(Number.parseFloat(num).toFixed(1));

export const parseCPUValue = (value) => {
    return `${toFixedNumber(value?.avg_cpu)}% avg${!value?.max_cpu ? '' : ` - ${toFixedNumber(value?.max_cpu)}% max`}`;
};
export const parseMemoryValue = (value) =>
    `${toFixedNumber(value?.avg_memory)}% avg${
        !value?.max_memory ? '' : ` - ${toFixedNumber(value?.max_memory)}% max`
    }`;
