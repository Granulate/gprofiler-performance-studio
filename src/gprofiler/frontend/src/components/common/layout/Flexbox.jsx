

import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

const Flexbox = ({ column = false, direction = undefined, children, sxOverrides = {}, ...props }) => {
    return (
        <Stack direction={direction ? direction : column ? 'column' : 'row'} {...props}>
            {children}
        </Stack>
    );
};

Flexbox.propTypes = {
    column: PropTypes.bool,
    className: PropTypes.string,
    alignItems: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    justifyContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
};

/** @component */
export default Flexbox;
