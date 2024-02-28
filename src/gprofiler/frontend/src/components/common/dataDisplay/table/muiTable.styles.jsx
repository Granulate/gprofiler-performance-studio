

import { Box, LinearProgress, Pagination, PaginationItem } from '@mui/material';
import {
    GridOverlay,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';

import { COLORS } from '@/theme/colors';

import { NextIcon, PrevIcon } from '../../icon/Icons';

export const MuiTableCustomLoadingOverlay = () => {
    return (
        <GridOverlay sx={{ width: '100%' }}>
            <Box sx={{ position: 'absolute', top: 0, width: '100%', zIndex: 9 }}>
                <LinearProgress />
            </Box>
        </GridOverlay>
    );
};

export const MuiTableCustomPagination = (variant = 'light') => {
    // this will manage the pagination,
    // sorting and current page of the table without the need of state (uncontrolled).
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    return pageCount > 1 ? (
        <Pagination
            renderItem={(item) => (
                <PaginationItem
                    components={{
                        previous: PrevIcon,
                        next: NextIcon,
                    }}
                    sx={{ fontWeight: item.selected ? 600 : 300 }}
                    {...item}
                />
            )}
            sx={{ margin: 'auto' }}
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    ) : (
        <></>
    );
};

export const MuiTableStyles = (isSmallTableMode = false) => ({
    borderRadius: 2,
    position: 'relative',
    '& .MuiDataGrid-main': {
        borderRadius: 2,
    },
    '& .MuiDataGrid-row:nth-of-type(even)': {
        backgroundColor: 'grey.light',
    },
    '& .MuiDataGrid-cell': {
        typography: isSmallTableMode ? 'body5_lato' : 'body1_lato',
        fontWeight: 400,
    },
    '& .MuiDataGrid-cell:first-of-type': {
        pl: 7,
    },
    '& .MuiDataGrid-cell:focus': {
        outline: 'none',
    },
    '& .MuiDataGrid-cell:focus-within': {
        outline: 'none',
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: 'grey.main',
        color: 'white.main',
    },
    '& .MuiDataGrid-sortIcon': {
        color: 'white.main',
    },
    '& .MuiDataGrid-columnSeparator': {
        visibility: 'hidden',
    },
    '& .MuiDataGrid-columnHeader:focus': {
        outline: 'none',
    },
    '& .MuiDataGrid-columnHeader:first-of-type': {
        pl: 7,
    },
    '& .MuiDataGrid-columnHeader:focus-within': {
        outline: 'none',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        typography: 'caption1_lato',
        textTransform: 'uppercase',
        fontWeight: 400,
    },
    '& .MuiDataGrid-columnHeaderTitleContainer': {
        padding: 0,
    },
});

export const MuiTableDarkStyles = (isSmallTableMode = false) => ({
    border: 'none',
    '& .MuiDataGrid-main': {
        border: 'none',
    },
    '& .MuiDataGrid-cell': {
        p: 5,
        verticalAlign: 'top',
        color: 'silverGrey.main',
        typography: isSmallTableMode ? 'body5_lato' : 'body1_lato',
        fontWeight: 600,
        borderBottomColor: 'hrGrey.main',
    },
    '& .MuiDataGrid-cell:focus': {
        outline: 'none',
    },
    '& .MuiDataGrid-cell:focus-within': {
        outline: 'none',
    },
    '& .MuiDataGrid-columnHeaders': {
        color: 'white.main',
        borderBottomColor: 'secondary.main',
        borderWidth: '2px',
    },
    '& .MuiDataGrid-sortIcon': {
        color: 'white.main',
    },
    '& .MuiDataGrid-columnSeparator': {
        visibility: 'hidden',
    },
    '& .MuiDataGrid-columnHeader:focus': {
        outline: 'none',
    },
    '& .MuiDataGrid-columnHeader:focus-within': {
        outline: 'none',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        fontSize: isSmallTableMode ? '12px' : '14px',
        fontWeight: 400,
    },
});

export const DarkPaginationStyles = {
    '& .MuiPaginationItem-root, & button.MuiPaginationItem-text': {
        color: 'white.main',
        typography: 'body1_lato',
    },
    '& button.MuiPaginationItem-text.Mui-selected': {
        color: 'secondary.main',
        zIndex: '1',
        position: 'relative',
    },
    '& button.MuiPaginationItem-text.Mui-selected::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '2px',
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.DARK_BLUE_1,
        borderRadius: '50%',
        zIndex: '-1',
    },
};

export const AutoHeightStyles = (length) => {
    return {
        '& .MuiDataGrid-viewport, .MuiDataGrid-row, .MuiDataGrid-renderingZone': {
            maxHeight: 'none !important',
        },
        '& .MuiDataGrid-virtualScroller': {
            height: `${(length - 1) * 50 + 200}px !important`,
            overflowX: 'auto !important',
        },
        '& .MuiDataGrid-cell ': {
            maxHeight: 'none !important',
            overflow: 'auto',
            whiteSpace: 'initial !important',
            lineHeight: '16px !important',
            display: 'flex !important',
            alignItems: 'center !important',
            paddingTop: '15px !important',
            paddingBottom: '15px !important',
        },
    };
};
