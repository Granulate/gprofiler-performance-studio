

import { COLORS } from '../../../theme/colors';
import Icon from '../../common/icon/Icon';
import { ICONS_NAMES } from '../../common/icon/iconsData';
import Flexbox from '../layout/Flexbox';

const Tag = ({ onClose, children }) => {
    return (
        <Flexbox
            alignItems='center'
            justifyContent='flex-start'
            sx={{
                backgroundColor: 'white.main',
                borderRadius: '25px',
                color: 'success.contrastText',
                fontSize: '14px',
                height: '26px',
                lineHeight: '16px',
                fontWeight: 400,
                listStyle: 'none',
                fontFamily: 'Lato',
                maxWidth: 200,
                position: 'relative',
                mx: 1,
                pt: 0,
                px: 5,
                pr: 8,
                '& span': {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
            }}>
            <span>{children}</span>
            <button
                type='button'
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100%',
                    borderRadius: '25px',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'absolute',
                    alignItems: 'center',
                    fontSize: 3,
                    color: COLORS.NAVY_DARK_BLUE,
                    justifyContent: 'center',
                    right: 0,
                    paddingRight: '5px',
                    backgroundColor: 'inherit',
                }}
                onClick={onClose}>
                <Icon name={ICONS_NAMES.Close} size={13} color={COLORS.NAVY_DARKER_BLUE} vertical />
            </button>
        </Flexbox>
    );
};

export default Tag;
