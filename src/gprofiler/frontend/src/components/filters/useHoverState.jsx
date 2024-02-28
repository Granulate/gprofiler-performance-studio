

import { useState } from 'react';

const useHoverState = () => {
    const [hoveredItemId, setHoveredItemId] = useState();

    const onMouseLeave = (id) => {
        if (id === hoveredItemId) {
            setHoveredItemId(undefined);
        }
    };

    const onMouseEnter = (id) => {
        setHoveredItemId(id);
    };

    return { hoveredItemId, onMouseEnter, onMouseLeave };
};

export default useHoverState;
