

import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Router>
        <StrictMode>
            <App />
        </StrictMode>
    </Router>
);
