

import { Box, Typography } from '@mui/material';

const SelectWithTitle = ({ children, title }) => {
    return (
        <Box sx={{ width: '100%', textAlign: 'left' }}>
            <Typography variant='body3_lato' sx={{ color: 'grey.dark' }}>
                {title}
            </Typography>
            {children}
        </Box>
    );
};
export default SelectWithTitle;
