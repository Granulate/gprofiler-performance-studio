{
    /*
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
     */
}

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
