

import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { isEmpty } from 'lodash';
import { useState } from 'react';

import { COLORS } from '../../theme/colors';
import Icon from '../common/icon/Icon';
import { ICONS_NAMES } from '../common/icon/iconsData';

const InstallationTextStepForm = ({ value, onChange, placeholder }) => {
    const [focused, setFocused] = useState(false);

    const handleValueChange = (e) => {
        setFocused(false);
        onChange(e);
    };

    const onFocus = () => {
        setFocused(true);
    };

    const isAdded = !focused && !isEmpty(value);

    const inputSuffix = isAdded && (
        <>
            <Icon name={ICONS_NAMES.CheckCircle} color={COLORS.SUCCESS_GREEN} />
            <Typography sx={{ color: 'success.main', ml: 2 }}> Added</Typography>
        </>
    );

    return (
        <Input
            sx={{
                width: '100%',
                typography: 'body1_lato',
                '&:before': {
                    borderBottom: `solid 1px ${COLORS.GREY_3}`,
                },
            }}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                    handleValueChange(ev);
                }
            }}
            endAdornment={inputSuffix}
            placeholder={placeholder}
            onBlur={handleValueChange}
            onFocus={onFocus}
        />
    );
};

export default InstallationTextStepForm;
