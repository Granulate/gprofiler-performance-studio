

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
