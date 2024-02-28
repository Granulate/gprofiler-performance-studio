

import Flexbox from '@/components/common/layout/Flexbox';

import ServiceGraph from './ServiceGraph';

const ServiceView = () => {
    return (
        <Flexbox column spacing={7}>
            <ServiceGraph />
        </Flexbox>
    );
};

export default ServiceView;
