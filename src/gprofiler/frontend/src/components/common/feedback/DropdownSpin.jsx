

import { CircularProgress } from '@mui/material';

import Flexbox from '../layout/Flexbox';

const DropdownSpin = () => (
    <Flexbox alignItems='center' justifyContent='center'>
        <CircularProgress size={20} />
    </Flexbox>
);

export default DropdownSpin;
