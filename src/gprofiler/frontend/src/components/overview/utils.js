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
