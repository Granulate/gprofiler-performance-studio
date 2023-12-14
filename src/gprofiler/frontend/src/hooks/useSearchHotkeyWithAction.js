{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
