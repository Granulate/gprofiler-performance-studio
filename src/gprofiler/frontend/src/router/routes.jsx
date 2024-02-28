

import InstallationPage from '../components/installation/InstallationPage';
import OverviewPage from '../components/overview/OverviewPage';
import WelcomePage from '../components/welcome/WelcomePage';
import { PAGES } from '../utils/consts';

export const ROUTES = [
    { path: PAGES.overview.to, exact: false, component: <OverviewPage /> },
    { path: PAGES.welcome.to, exact: true, component: <WelcomePage /> },
    { path: PAGES.installation.to, exact: false, component: <InstallationPage /> },
];
