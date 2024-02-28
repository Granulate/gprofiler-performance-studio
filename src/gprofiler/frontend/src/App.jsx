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
