

import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import {
    AutoHeightStyles,
    DarkPaginationStyles,
    MuiTableCustomLoadingOverlay,
    MuiTableCustomPagination,
    MuiTableDarkStyles,
    MuiTableStyles,
} from './muiTable.styles';

const MuiTable = ({
    columns,
    data,
    isLoading = false,
    initialState = {},
    pageSize = 15,
    rowHeight = 35,
    variant = 'light',
    multipleLinesCells = false,
    padding = 0,
    search = undefined,
    emptyStateComponent = undefined,
    footer = undefined,
    hideFooter = false,
    onRowClick = undefined,
    getRowId = undefined,
    autoPageSize = false,
    size = 'normal',
    sx = undefined,
}) => {
    const isDarkMode = variant !== 'light';
    const isSmallTableMode = size === 'small';
    return (
        <Box
            sx={{
                width: '100%',
                '& .compare-column': {
                    backgroundColor: 'fieldBlue.main',
                },
                p: padding,
                ...(isDarkMode && DarkPaginationStyles),
                ...(multipleLinesCells && data && AutoHeightStyles(data.length)),
            }}>
            <DataGrid
                sx={{
                    ...(isDarkMode ? MuiTableDarkStyles(isSmallTableMode) : MuiTableStyles(isSmallTableMode)),
                    ...sx,
                }}
                components={{
                    Pagination: MuiTableCustomPagination,
                    LoadingOverlay: MuiTableCustomLoadingOverlay,
                    Toolbar: search ? search.component : null,
                    NoRowsOverlay: emptyStateComponent,
                    Footer: footer ? () => footer : undefined,
                }}
                componentsProps={{
                    toolbar: search ? search.props : {},
                }}
                onRowClick={onRowClick}
                loading={isLoading}
                autoHeight
                pagination
                hideFooter={hideFooter}
                pageSize={pageSize}
                rowHeight={rowHeight}
                headerHeight={40}
                rows={data}
                columns={columns}
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableSelectionOnClick
                initialState={initialState}
                disableVirtualization={multipleLinesCells}
                getRowId={getRowId}
                autoPageSize={autoPageSize}
            />
        </Box>
    );
};

export default MuiTable;
