

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

const Error = ({ title, message }) => (
    <Box
        sx={{
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
        }}>
        <Alert severity='error'>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    </Box>
);

export default Error;
