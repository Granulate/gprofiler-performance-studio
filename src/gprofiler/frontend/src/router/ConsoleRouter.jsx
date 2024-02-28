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

import { Redirect, Route, Switch } from 'react-router-dom';

import useGetSummaryData from '../api/hooks/useGetSummaryData';
import Loader from '../components/common/feedback/Loader';
import ComparisonPage from '../components/comparison/ComparisonPage';
import ProfilesPage from '../components/profiles/ProfilesPage';
import { FgProvider, FiltersProvider, SearchProvider } from '../states';
import { PAGES } from '../utils/consts';
import { ROUTES } from './routes';

const FgPageWithContext = ({ isDisabled = false }) => (
    <FiltersProvider>
        <FgProvider>
            <SearchProvider>
                <ProfilesPage isDisabled={isDisabled} />
            </SearchProvider>
        </FgProvider>
    </FiltersProvider>
);

export const ComparisonPageWithContext = () => (
    <FiltersProvider>
        <FgProvider>
            <SearchProvider>
                <ComparisonPage />
            </SearchProvider>
        </FgProvider>
    </FiltersProvider>
);

const ServicesCountRedirectRouter = () => {
    const { summaryData, loading } = useGetSummaryData();
    const servicesCount = summaryData?.services || 0;

    return loading ? (
        <Loader />
    ) : servicesCount ? (
        <Redirect to={PAGES.profiles.key} />
    ) : (
        <Redirect to={PAGES.overview.key} />
    );
};

function ConsoleRouter() {
    return (
        <Switch>
            <Route path={'/'} exact>
                <ServicesCountRedirectRouter />
            </Route>
            <Route path={PAGES.profiles.to}>
                <FgPageWithContext />
            </Route>
            <Route path={PAGES.comparison.to}>
                <ComparisonPageWithContext />
            </Route>
            {ROUTES.map((route) => (
                <Route key={route.path} path={route.path} exact={route.exact}>
                    {route.component}
                </Route>
            ))}
        </Switch>
    );
}

export default ConsoleRouter;
