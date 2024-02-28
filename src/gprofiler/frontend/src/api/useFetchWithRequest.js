

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
