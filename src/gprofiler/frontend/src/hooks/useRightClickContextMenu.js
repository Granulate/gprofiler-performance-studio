

import { useState } from 'react';

const useRightClickContextMenu = () => {
    const [contextMenu, setContextMenu] = useState(null);

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                      mouseX: event.clientX + 2,
                      mouseY: event.clientY - 6,
                  }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                  // Other native context menus might behave different.
                  // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                  null
        );
    };

    return { handleClose, handleContextMenu, contextMenu };
};

export default useRightClickContextMenu;
