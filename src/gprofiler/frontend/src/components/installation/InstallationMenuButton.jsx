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

import { Divider, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Fragment } from 'react';

import { COLORS } from '../../theme/colors';

const InstallationMenuButton = ({ index, method, onClick, selected, disabled }) => {
    return (
        <Fragment key={method.name}>
            <ListItemButton
                disabled={disabled}
                selected={selected}
                onClick={() => onClick(index)}
                key={method.name}
                sx={{
                    '&.Mui-selected': {
                        borderLeft: `3px solid ${COLORS.BLUE}`,
                        borderRadius: '4px',
                        backgroundColor: 'rgba(97, 99, 112, 0.1)',
                        color: 'black.main',
                    },
                }}>
                {method.icon && <ListItemIcon>{method.icon}</ListItemIcon>}
                <ListItemText disableTypography>
                    <Typography variant='body1_lato' sx={{ fontWeight: selected ? 'bold' : 'inherit' }}>
                        {method.name}
                    </Typography>
                </ListItemText>
            </ListItemButton>
            <Divider key={method.name + 'separator'} />
        </Fragment>
    );
};

export default InstallationMenuButton;
