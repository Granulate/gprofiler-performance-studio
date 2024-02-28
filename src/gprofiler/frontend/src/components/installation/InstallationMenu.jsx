

import { List } from '@mui/material';
import PropTypes from 'prop-types';

import InstallationMenuButton from './InstallationMenuButton';

const InstallationMenu = ({ options, onClick, selectedKey, disabled }) => {
    return (
        <List dense sx={{ maxWidth: 220, minWidth: 180 }}>
            {options.map((option, index) => {
                const isSelected = selectedKey === option.key;
                return (
                    <InstallationMenuButton
                        key={index}
                        index={index}
                        method={option}
                        onClick={onClick}
                        selected={isSelected}
                        disabled={disabled}
                    />
                );
            })}
        </List>
    );
};

InstallationMenu.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.node,
        })
    ),
    onClick: PropTypes.func,
    selectedKey: PropTypes.string,
};

export default InstallationMenu;
