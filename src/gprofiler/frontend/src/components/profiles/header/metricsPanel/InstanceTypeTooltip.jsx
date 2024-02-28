

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
