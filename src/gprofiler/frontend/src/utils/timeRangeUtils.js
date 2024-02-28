

export const MAP_TIME_TO_FILTER_QUERY = {
    '15min': '15min',
    '30min': '30min',
    hourly: '1h',
    '6h': '6h',
    daily: '1d',
    weekly: '1w',
};

export const MAP_FILTER_QUERY_TO_TIME = {
    '15min': '15min',
    '30min': '30min',
    '1h': 'hourly',
    '6h': '6h',
    '1d': 'daily',
    '1w': 'weekly',
};

export const TIME_QUERY_PARAMS = Object.keys(MAP_FILTER_QUERY_TO_TIME);

export const isDateQueryParamsExists = (timeQueryParam) => {
    return Object.prototype.hasOwnProperty.call(MAP_FILTER_QUERY_TO_TIME, timeQueryParam);
};
