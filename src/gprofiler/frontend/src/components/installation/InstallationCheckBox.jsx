

import { Checkbox, FormControlLabel, Typography } from '@mui/material';

const InstallationCheckBox = ({ enableText, isChecked, setIsChecked }) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    sx={{ p: 0, mr: 2 }}
                    size='small'
                    checked={isChecked}
                    onChange={() => setIsChecked((prev) => !prev)}
                />
            }
            label={<Typography variant='body1_lato'>{enableText}</Typography>}
        />
    );
};

export default InstallationCheckBox;
