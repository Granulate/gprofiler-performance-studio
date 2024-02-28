

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ErrorBoundary } from 'react-error-boundary';
import { Route } from 'react-router-dom';
import { QueryParamProvider, transformSearchStringJsonSafe } from 'use-query-params';

import ErrorFallback from './components/common/feedback/ErrorFallback';
import Console from './components/console/Console';
import theme from './theme/theme';

const queryStringifyOptions = {
    transformSearchString: transformSearchStringJsonSafe,
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <QueryParamProvider ReactRouterRoute={Route} stringifyOptions={queryStringifyOptions}>
                    <Console />
                </QueryParamProvider>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
