{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

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
