

import { useContext, useEffect } from 'react';

import { SelectorsContext } from '../states';

const UsePageTitle = () => {
    const { selectedService } = useContext(SelectorsContext);
    useEffect(() => {
        // Update the document title using the browser API
        if (selectedService) {
            const title = `gProfiler ${selectedService ? ' - ' + selectedService : ''}`;
            document.title = title;
        }
    }, [selectedService]);
};

export default UsePageTitle;
