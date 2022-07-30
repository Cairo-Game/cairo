import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { setupStore } from 'store/Store';
import registerServiceWorker from '../src/registerServiceWorker';

const container = document.getElementById('main');
const root = createRoot(container);
const store = setupStore();

root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

registerServiceWorker();
