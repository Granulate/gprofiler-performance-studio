{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import { useRequest } from 'ahooks';

import { ERROR_CODES } from './utils';

const useFetchWithRequest = (request, options = {}, withToken = true) => {
    return useRequest((bodyRunArgs) => {
        return fetch(request.url, {
            method: request.method,
            body: bodyRunArgs || request.body,
            headers: { ...request.headers },
        }).then((response) => {
            if (!response.ok) {
                const newError = new Error(response?.statusText || 'failed');
                newError.code = response?.status; // you can custom insert your error code
                newError.name = response.statusText;

                throw newError;
            }
            if (response.status === ERROR_CODES.NO_CONTENT) {
                return [];
            }
            return response.json();
        });
    }, options);
};

export default useFetchWithRequest;
