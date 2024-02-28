

import { Link, Typography } from '@mui/material';
import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Tooltip from '@/components/common/dataDisplay/muiToolTip/Tooltip';
import Flexbox from '@/components/common/layout/Flexbox';
import { SelectorsContext } from '@/states';
import { PAGES } from '@/utils/consts';

import { ClusterTypeIcon } from '../../../profiles/header/ClusterTypeIcon';

const ServiceNameCell = ({ cell }) => {
    const history = useHistory();
    const location = useLocation();
    const { setSelectedService } = useContext(SelectorsContext);

    const onServiceNameClick = () => {
        history.push({ pathname: PAGES.profiles.to, search: location.search });
        setSelectedService(cell.value);
    };
    const type = cell.row.type || false;
    return (
        <Flexbox sx={{ cursor: 'pointer' }} alignItems='center' spacing={3}>
            {type !== undefined && (
                <Tooltip content={type ? type : ''}>
                    <span>
                        <Flexbox>
                            <ClusterTypeIcon type={type} />
                        </Flexbox>
                    </span>
                </Tooltip>
            )}

            <Tooltip content={cell.value} placement='bottom-start' delay={[500, 0]} arrow={false} followCursor={true}>
                <Link
                    onClick={onServiceNameClick}
                    sx={{
                        textDecoration: 'none',
                        ':hover': { textDecoration: 'underline' },
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                    }}>
                    <Typography variant='body1_lato' sx={{ color: 'grey.dark' }}>
                        {cell.value}
                    </Typography>
                </Link>
            </Tooltip>
        </Flexbox>
    );
};

export default ServiceNameCell;
