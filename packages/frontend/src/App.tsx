import React from 'react';
import { AppRoutes } from './routes/Routes';
import './App.css';
import './styles/common/common.css';
import 'antd/dist/antd.css';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const App = () => {
    return (
        <ErrorBoundary>
            <AppRoutes />
        </ErrorBoundary>
    );
};

export default App;
