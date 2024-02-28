

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
