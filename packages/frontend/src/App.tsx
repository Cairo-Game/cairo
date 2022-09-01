import React, { useEffect, useState } from 'react';
import { AppRoutes } from './routes/Routes';
import './App.scss';
import './styles/common/common.css';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App = () => {
    const [hasWindow, setHasWindow] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHasWindow(true);
        }
    }, []);

    return (
        <>
            {hasWindow && (
                <ErrorBoundary>
                    <AppRoutes />
                </ErrorBoundary>
            )}
        </>
    );
};

export default App;
