{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import _ from 'lodash';
import { useMemo } from 'react';

import MuiTable from '@/components/common/dataDisplay/table/MuiTable';

import Tooltip from '../../../common/dataDisplay/muiToolTip/Tooltip';
import INSTANCES_TYPES_TABLE_COLUMNS from './instancesTypeTableColumns';

const InstanceTypeTooltip = ({ instanceTypeData, children }) => {
    const instancesSum = useMemo(
        () => instanceTypeData?.reduce((prevSum, currentType) => prevSum + currentType.instance_count, 0),
        [instanceTypeData]
    );
    const instancesSumByType = useMemo(() => {
        const groupByInstaceData = _.groupBy(instanceTypeData, 'instance_type');
        return _.map(groupByInstaceData, (value, key) => {
            return { instanceType: key, instanceCount: _.sumBy(value, 'instance_count') };
        });
    }, [instanceTypeData]);

    return (
        <Tooltip
            placement='bottom'
            noPadding
            arrow
            variant='dark'
            sx={{
                minWidth: 250,
                '& .MuiDataGrid-columnHeaders': {
                    pl: 2,
                },
            }}
            content={
                <MuiTable
                    sx={{
                        p: 2,
                    }}
                    hideFooter
                    size='small'
                    variant='dark'
                    columns={INSTANCES_TYPES_TABLE_COLUMNS(instancesSum)}
                    data={instancesSumByType}
                    getRowId={(type) => type.instanceType}
                />
            }>
            {children}
        </Tooltip>
    );
};

export default InstanceTypeTooltip;
