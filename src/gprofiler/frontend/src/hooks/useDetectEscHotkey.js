

import { useKeyPress } from 'ahooks';

const escape = ['Escape', 'Esc'];

const useDetectEscHotkey = (customAction) => {
    return useKeyPress(escape, (event) => {
        if (event.code) {
            customAction();
            event.preventDefault();
        }
    });
};

export default useDetectEscHotkey;
