

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
