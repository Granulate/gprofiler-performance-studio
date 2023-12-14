{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import _ from 'lodash';

import { isValidDate } from '@/utils/datetimesUtils';

export const parseService = (service) => {
    const cores = _.get(service, 'cores');
    const nodes = _.get(service, 'nodes');
    const createDate = new Date(_.get(service, 'createDate'));
    const lastUpdate = new Date(_.get(service, 'lastUpdated'));

    return {
        name: _.get(service, 'serviceName'),
        version: _.get(service, 'agentVersionLowest'),
        type: _.get(service, 'envType'),
        cores: cores && cores >= 0 ? cores : -1,
        nodes: nodes && nodes >= 0 ? nodes : -1,
        createDate: isValidDate(createDate) ? createDate : 'N/A',
        lastUpdate: isValidDate(lastUpdate) ? lastUpdate : 'N/A',
    };
};

export const get2DigitsPercents = (number) => _.round(number * 100, 2);
