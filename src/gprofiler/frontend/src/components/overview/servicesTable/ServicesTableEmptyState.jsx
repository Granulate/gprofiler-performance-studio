

import { Link } from 'react-router-dom';

import { NewServicePurpleIcon } from '../../../svg';
import Flexbox from '../../common/layout/Flexbox';

const ServicesTableEmptyState = () => {
    return (
        <Flexbox column justifyContent='center' alignItems='center' sx={{ py: 1 }}>
            <Link to={`/installation`}>
                <NewServicePurpleIcon />
            </Link>
        </Flexbox>
    );
};

export default ServicesTableEmptyState;
