

import { useKeyPress } from 'ahooks';
import { useMemo } from 'react';

const useSearchHotkey = (searchRef) => {
    const findKeyPress = useMemo(() => {
        if (navigator.platform.startsWith('Mac')) {
            return 'meta.f';
        } else if (navigator.platform.startsWith('Linux') || navigator.platform.startsWith('Win')) {
            return 'ctrl.f';
        }
        return '';
    }, []);
    return useKeyPress([findKeyPress], (event) => {
        if (searchRef.current && event.code) {
            searchRef.current.focus();
            event.preventDefault();
        }
    });
};

export default useSearchHotkey;
