

import { FILTER_OPERATIONS } from '../../utils/filtersUtils';

const isFilterTypeExist = (type, filter) => {
    const [, rules] = Object.entries(filter.filter)[0];
    return rules?.some((rule) => {
        const [ruleType] = Object.entries(rule)[0];
        return type === ruleType;
    });
};

export const shouldShowFilterTypeOptions = (filter, { type, operator }) => {
    return operator === FILTER_OPERATIONS.$or.value || !isFilterTypeExist(type, filter);
};
