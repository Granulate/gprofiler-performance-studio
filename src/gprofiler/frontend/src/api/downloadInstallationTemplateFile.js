{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import _ from 'lodash';
import { stringify } from 'query-string';

import { getJSON } from './utils';

class JsonError extends Error {}

const handleError = (error, setIsLoading) => {
    setIsLoading(false);
    throw error;
};

const downloadInstallationTemplateFile = async (
    serviceName,
    namespace,
    filename,
    setIsLoading,
    type = 'daemon_set'
) => {
    try {
        const queryData = { serviceName, namespace };
        let result;
        setIsLoading(true);
        const url = `/api/installations/${type}/file?${stringify(queryData)}`;
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            cache: 'no-cache',
        });
        if (response.headers.get('Content-Type') === 'application/json') {
            try {
                result = await getJSON(response);
            } catch (e) {
                handleError(new JsonError('Bad json response'), setIsLoading);
            }
            if (!result.success) {
                if (!_.isUndefined(result.message)) {
                    handleError(Error(result.message), setIsLoading);
                }
                handleError(new JsonError('Bad json response'), setIsLoading);
            }
        } else {
            result = await response.blob();
            const ymlURL = window.URL.createObjectURL(result);
            let tempLink = document.createElement('a');
            tempLink.href = ymlURL;
            tempLink.setAttribute('download', filename);
            tempLink.click();
        }
        setIsLoading(false);
    } catch (e) {
        handleError(e, setIsLoading);
    }
};
export { downloadInstallationTemplateFile };
