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
