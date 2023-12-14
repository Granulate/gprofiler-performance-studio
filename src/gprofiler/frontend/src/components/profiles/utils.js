{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

//These are the options we want to let the user choose, but there are more options that are available in the rest flameDB if required

const ResolutionTimes = ['1 min', '5 min', '15 min', '1 hour', '6 hour'];
const ResolutionTimesConvert = {
    '1 min': '1 minutes',
    '5 min': '5 minutes',
    '15 min': '15 minutes',
    '1 hour': '1 hours',
    '6 hour': '6 hours',
};

export { ResolutionTimes, ResolutionTimesConvert };
