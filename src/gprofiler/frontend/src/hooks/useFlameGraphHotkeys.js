

import { useKeyPress } from 'ahooks';
import { useCallback, useEffect, useMemo, useState } from 'react';

// The keyboard keys values for javascript
const keys = ['u', 219, 222, 220, 186, 221];

const checkIfEqualFrames = (a, b) => a.level === b.level && a.start === b.start && a.duration === b.duration;

const useFlameGraphHotkeys = ({ setSelectedNode }) => {
    const [savedFrames, setSavedFrames] = useState([]);
    const [savedFrameIndex, setSavedFrameIndex] = useState(-1);
    const addNewSavedFrame = useCallback((newFrame) => {
        setSavedFrames((prev) => {
            if (prev.length > 0 && checkIfEqualFrames(newFrame, prev[prev.length - 1])) {
                return prev;
            }
            return [...prev, newFrame];
        });
    }, []);

    const resetSavedFrames = useCallback(() => {
        setSavedFrames([]);
    }, []);

    useEffect(() => {
        setSavedFrameIndex(savedFrames.length ? savedFrames.length - 1 : 0);
    }, [savedFrames]);

    const baseKey = useMemo(() => {
        if (navigator.platform.startsWith('Mac')) {
            return 'metaKey';
        } else if (navigator.platform.startsWith('Linux') || navigator.platform.startsWith('Win')) {
            return 'ctrlKey';
        }
        return '';
    }, []);

    useKeyPress(keys, (event) => {
        // if ctrl/cmd was pressed and we get the right key code
        if (!!event[baseKey] && event.code) {
            event.preventDefault();
            // reset view frame only if its user is not trying to move to forward non-existing frame
            if (event.code !== 'BracketRight' && savedFrameIndex < savedFrames.length) {
                setSelectedNode(undefined);
            }

            setSelectedNode((prev) => {
                switch (event.code) {
                    // Reset view
                    case 'KeyU':
                        return undefined;
                    // Go to next saved (visited) frame if exist
                    case 'BracketRight':
                        if (savedFrames.length && savedFrames.length >= savedFrameIndex + 2) {
                            const newFrameIndex = savedFrameIndex + 1;
                            setSavedFrameIndex(newFrameIndex);
                            return savedFrames[newFrameIndex];
                        }
                        return prev;
                    // Go to previous (visited) saved frame if exist
                    case 'BracketLeft':
                        if (savedFrameIndex === 0) {
                            setSavedFrameIndex(-1);
                            return undefined;
                        } else if (savedFrameIndex > 0 && savedFrames.length > 0) {
                            const newFrameIndex = savedFrameIndex - 1;
                            setSavedFrameIndex(newFrameIndex);
                            return savedFrames[newFrameIndex];
                        }
                        return prev;
                    default:
                        return prev;
                }
            });
        }
    });

    return { addNewSavedFrame, resetSavedFrames };
};

export default useFlameGraphHotkeys;
