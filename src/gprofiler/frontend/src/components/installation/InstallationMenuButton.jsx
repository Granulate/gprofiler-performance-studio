

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
