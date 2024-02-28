

import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import _ from 'lodash';

import { InfoIcon } from '../../svg';
import { COLORS } from '../../theme/colors';
import Flexbox from '../common/layout/Flexbox';

const InstallationStep = ({ index, step }) => {
    return (
        <ListItem alignItems='flex-start' sx={{ p: 0, pb: 5 }} key={'step' + index}>
            <ListItemAvatar sx={{ minWidth: 0 }}>
                <Avatar
                    sx={{
                        background: COLORS.WHITE,
                        color: COLORS.BLUE_5,
                        typography: 'body4',
                        border: `1px solid ${COLORS.ALMOST_WHITE}`,
                        width: '30px',
                        height: '30px',
                        my: 0,
                    }}>
                    {index + 1}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                disableTypography
                sx={{ mt: 3, ml: 3 }}
                primary={
                    <Typography variant='h2_lato' sx={{ pt: 2 }}>
                        {step.title}
                    </Typography>
                }
                secondary={
                    <Box sx={{ mt: 2 }}>
                        <Typography variant='body1_lato' sx={{ color: 'plainGrey.main' }}>
                            {step.description}
                        </Typography>
                        {step.warning && (
                            <Flexbox sx={{ mt: 2 }}>
                                <InfoIcon />
                                <Typography variant='body1_lato' sx={{ ml: 3, color: 'plainGrey.main' }}>
                                    {step.warning}
                                </Typography>
                            </Flexbox>
                        )}
                        {!_.isEmpty(step.content) && <Box sx={{ mt: 3 }}>{step.content}</Box>}
                    </Box>
                }
            />
        </ListItem>
    );
};

export default InstallationStep;
