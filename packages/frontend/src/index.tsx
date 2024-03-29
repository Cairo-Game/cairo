import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { setupStore } from './store/Store';
import registerServiceWorker from '../registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './services/ThemeProvider';
import { UserProvider } from './services/UserProvider';

const store = setupStore(window.__INITIAL_STATE__);

declare global {
    interface Window {
        __INITIAL_STATE__;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
}

const container = document.getElementById('main');
hydrateRoot(
    container,
    <UserProvider>
        <ThemeProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </UserProvider>,
);

registerServiceWorker();
