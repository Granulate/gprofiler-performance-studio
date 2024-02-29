{
    /*
     * Copyright (C) 2023 Intel Corporation
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *    http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
}

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
