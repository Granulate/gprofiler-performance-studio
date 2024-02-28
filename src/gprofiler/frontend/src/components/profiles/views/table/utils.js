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



import { isDateYesterday } from '@/utils/datetimesUtils';

export const getGeneratedTimeSelectionText = (timeSelection) => {
    const { relativeTime, customTime } = timeSelection;
    if (relativeTime) {
        switch (relativeTime) {
            case 'weekly':
                return 'Last 7 Days';
            case 'daily':
                return 'Today’s';
            case 'hourly':
                return 'Last Hour’s';
            default:
                return '';
        }
    }

    if (isDateYesterday(customTime)) {
        return 'Yesterday’s';
    }

    return 'Custom time';
};
