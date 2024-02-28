

import { useKeyPress } from 'ahooks';
import { useMemo } from 'react';

const useOpenAndSearchHotkey = (searchRef, openSearchAction) => {
    const findKeyPress = useMemo(() => {
        if (navigator.platform.startsWith('Mac')) {
            return 'meta.f';
        } else if (navigator.platform.startsWith('Linux') || navigator.platform.startsWith('Win')) {
            return 'ctrl.f';
        }
        return '';
    }, []);
    return useKeyPress([findKeyPress], (event) => {
        if (event.code) {
            openSearchAction();
            setTimeout(() => {
                if (searchRef.current) {
                    searchRef.current.focus();
                }
            }, 500);
            event.preventDefault();
        }
    });
};

export default useOpenAndSearchHotkey;
