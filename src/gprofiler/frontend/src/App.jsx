{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
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
