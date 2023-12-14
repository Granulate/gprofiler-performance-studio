{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import _ from 'lodash';

const INSTANCES_TYPES_TABLE_COLUMNS = (instancesSum) => [
    { headerName: 'Name', field: 'instanceType', width: 128 },
    {
        headerName: 'Percent',
        field: 'instanceCount',
        width: 78,
        renderCell: (cell) => {
            return `${_.round((cell.value / instancesSum) * 100, 2)}%`;
        },
    },
];

export default INSTANCES_TYPES_TABLE_COLUMNS;
