

import { useKeyPress } from 'ahooks';
import { useMemo } from 'react';

const useSearchHotkeyWithAction = (onKeyPressed) => {
    const findKeyPress = useMemo(() => {
        if (navigator.platform.startsWith('Mac')) {
            return 'meta.f';
        } else if (navigator.platform.startsWith('Linux') || navigator.platform.startsWith('Win')) {
            return 'ctrl.f';
        }
        return '';
    }, []);
    return useKeyPress([findKeyPress], (event) => {
        event.preventDefault();
        onKeyPressed();
    });
};

export default useSearchHotkeyWithAction;
