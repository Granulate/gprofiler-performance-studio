

import { MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

import { ColorPalette } from '../../../theme/colors';
import Tooltip from '../../common/dataDisplay/muiToolTip/Tooltip';

const FiltersSelectItem = ({ value, label, description, ...props }) => {
    return (
        <Tooltip maxWidth={550} content={description} placement='left'>
            <MenuItem
                sx={{
                    typography: 'body1_lato',
                    '&:hover': {
                        backgroundColor: ColorPalette.fieldBlue.main,
                        color: ColorPalette.primary.main,
                    },
                }}
                value={value}
                {...props}>
                {label}
            </MenuItem>
        </Tooltip>
    );
};

FiltersSelectItem.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
};

export default FiltersSelectItem;
