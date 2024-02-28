{/*
 * Copyright (C) 2023 Intel Corporation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
