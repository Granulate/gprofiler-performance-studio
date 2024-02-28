

import { useContext } from 'react';

import { FiltersContext, SearchContext } from '../../../states';
import Button from '../../common/button/Button';

const ResetViewButton = ({ disabled = false }) => {
    const { setSearchValue } = useContext(SearchContext);
    const { resetProcessFilters, resetRuntimeFilters } = useContext(FiltersContext);

    return (
        <Button
            variant='text'
            disabled={disabled}
            sx={{ minWidth: '98px' }}
            onClick={() => {
                setSearchValue('');
                resetProcessFilters();
                resetRuntimeFilters();
                // this is a hack for fg to have enough time to parse and then reset properly
                setTimeout(() => {
                    resetProcessFilters();
                }, 100);
            }}>
            Reset view
        </Button>
    );
};

export default ResetViewButton;
