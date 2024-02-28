

import { CircularProgress } from '@mui/material';

import Flexbox from '../layout/Flexbox';

const Loader = () => (
    <Flexbox column justifyContent='center' alignItems='center' sx={{ height: '100%', minHeight: '300px' }}>
        <CircularProgress />
    </Flexbox>
);

export default Loader;
