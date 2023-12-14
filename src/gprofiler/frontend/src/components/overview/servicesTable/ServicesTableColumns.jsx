{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { getLiteralDate } from '@/utils/datetimesUtils';

import Button from '../../common/button/Button';
import Icon from '../../common/icon/Icon';
import { ICONS_NAMES } from '../../common/icon/iconsData';
import Flexbox from '../../common/layout/Flexbox';
import ServiceNameCell from './cells/ServiceNameCell';

// compare between two version strings
const isLargerVersion = (version1, version2) => {
    const version1Parts = version1.split('.');
    const version2Parts = version2.split('.');
    for (var i = 0; i < version2Parts.length; i++) {
        const version1Part = parseInt(version1Parts[i]);
        const version2Part = parseInt(version2Parts[i]);
        if (version1Part > version2Part) return 1;
        if (version1Part < version2Part) return -1;
    }
    return 0;
};

export const SERVICES_TABLE_COLUMNS = (setOpenSearch) => [
    {
        headerName: 'Service Name',
        field: 'name',
        renderCell: (cell) => <ServiceNameCell cell={cell} />,
        flex: 1,
        renderHeader: () => (
            <Flexbox
                spacing={3}
                alignItems='center'
                sx={{
                    typography: 'body5_lato',
                    textTransform: 'uppercase',
                }}>
                Service name
                <Button
                    iconOnly
                    color='inherit'
                    onClick={(event) => {
                        event.stopPropagation();
                        setOpenSearch(true);
                    }}
                    sx={{ zIndex: 999 }}>
                    <Icon name={ICONS_NAMES.Magnifier} color='#ffffff' size={25} />
                </Button>
            </Flexbox>
        ),
        minWidth: 200,
    },
    {
        headerName: 'Create date',
        type: 'date',
        field: 'createDate',
        width: 130,
        renderCell: (cell) => (cell.value ? getLiteralDate(cell.value) : 'N/A'),
    },
    {
        headerName: 'Last update',
        type: 'date',
        field: 'lastUpdate',
        width: 150,
        renderCell: (cell) => (cell.value ? getLiteralDate(cell.value) : 'N/A'),
    },
    {
        headerName: 'Nodes',
        field: 'nodes',
        type: 'number',
        align: 'left',
        headerAlign: 'left',
        renderCell: (cell) => (cell.value > 0 ? cell.value : 'N/A'),
        width: 80,
    },
    {
        headerName: 'Cores',
        field: 'cores',
        type: 'number',
        align: 'left',
        headerAlign: 'left',
        renderCell: (cell) => (cell.value > 0 ? cell.value : 'N/A'),
        width: 80,
    },
    {
        headerName: 'Version',
        field: 'version',
        sortingOrder: ['desc', 'asc', null],
        width: 100,
        sortComparator: isLargerVersion,
    },
];
