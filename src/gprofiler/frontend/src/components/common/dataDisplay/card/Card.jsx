

import Box from '@mui/material/Box';

const Card = ({ children, sxOverrides = {} }) => {
    return (
        <Box
            sx={{
                width: '100%',
                boxShadow: 2,
                padding: 8,
                height: '100%',
                borderRadius: 1,
                backgroundColor: 'white.main',
                ...sxOverrides,
            }}>
            {children}
        </Box>
    );
};

export default Card;
