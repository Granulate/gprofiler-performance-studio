

import { Radio as MuiRadio } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

const Radio = (props) => {
    return <FormControlLabel control={<MuiRadio size='small' sx={{ p: 2 }} />} {...props} />;
};
export default Radio;
