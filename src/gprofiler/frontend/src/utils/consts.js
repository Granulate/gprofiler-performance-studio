

export const PAGES = {
    profiles: {
        key: 'profiles',
        label: 'Profiles',
        to: '/profiles',
    },
    overview: {
        key: 'overview',
        label: 'Overview',
        to: '/overview',
    },
    comparison: {
        key: 'comparison',
        label: 'Comparison',
        to: '/compare',
    },
    installation: {
        key: 'installation',
        label: 'Install Service',
        to: '/installation',
    },
    welcome: {
        key: 'welcome',
        label: 'Welcome',
        to: '/welcome',
    },
    login: {
        key: 'login',
        label: 'Login',
        to: '/login',
    },
};

export const EXTERNAL_URLS = {
    documentation: {
        key: 'documentation',
        label: 'documentation',
        to: 'https://docs.gprofiler.io/',
    },
    github: {
        key: 'github',
        label: 'github',
        to: 'https://github.com/Granulate/gprofiler',
    },
    flameGraphLearn: {
        key: 'flameGraphLearn',
        label: 'learn more',
        to: 'https://docs.gprofiler.io/about-gprofiler/gprofiler-features/views/flame-graph',
    },
    tableViewLearn: {
        key: 'tableViewLearn',
        label: 'learn more',
        to: 'https://docs.gprofiler.io/about-gprofiler/gprofiler-features/views/table-view',
    },
    serviceViewLearn: {
        key: 'serviceViewLearn',
        label: 'learn more',
        to: 'https://docs.gprofiler.io/about-gprofiler/gprofiler-features/views/service-overview',
    },
};

export const PROFILES_VIEWS = {
    flamegraph: 'flamegraph',
    table: 'table',
    service: 'service',
};

export const SPLIT_VIEW_ANIMATION_DURATION_IN_SECONDS = 0.7;

export const COPY_ONLY_IN_HTTPS = 'This feature is available only in secure contexts (HTTPS)';
export const STACKS_COUNT = 500000;
export const ENV_VAR_PREFIX = import.meta.env;
export const DEMO_URL = 'https://demo-profiler.granulate.io/';
