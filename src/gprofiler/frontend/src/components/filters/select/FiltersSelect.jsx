{/*
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
*/}



import { Select as MuiSelect, SvgIcon } from '@mui/material';

import { COLORS } from '../../../theme/colors';
import { ICONS } from '../../common/icon/iconsData';

const Select = ({ children, width = 295, ...props }) => {
    return (
        <MuiSelect
            {...props}
            displayEmpty={true}
            MenuProps={{
                disableAutoFocusItem: true,
                elevation: 0,
                sx: { mt: 1 },
                PaperProps: { sx: { maxHeight: 400 } },
                MenuListProps: { sx: { backgroundColor: COLORS.FIELD_BLUE_B, boxShadow: 0 } },
            }}
            IconComponent={(props) => <SelectIcon {...props} />}
            sx={{
                width: width,
                backgroundColor: 'fieldBlueB.main',
                height: 36,
                typography: 'body1_lato',
            }}>
            {children}
        </MuiSelect>
    );
};

const SelectIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path d={ICONS.ChevronDown} />
        </SvgIcon>
    );
};

export default Select;
