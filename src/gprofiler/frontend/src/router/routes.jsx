{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

import InstallationPage from '../components/installation/InstallationPage';
import OverviewPage from '../components/overview/OverviewPage';
import WelcomePage from '../components/welcome/WelcomePage';
import { PAGES } from '../utils/consts';

export const ROUTES = [
    { path: PAGES.overview.to, exact: false, component: <OverviewPage /> },
    { path: PAGES.welcome.to, exact: true, component: <WelcomePage /> },
    { path: PAGES.installation.to, exact: false, component: <InstallationPage /> },
];
