import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { useRouter } from './hooks/useRouter';
import { routes } from './Routes-List';

export const AppRoutes: () => JSX.Element = () => {
    const { routes: appRoutes } = useRouter(routes);

    return (
        <React.Suspense fallback={<p>Загрузка...</p>}>
            <BrowserRouter>
                <Routes>{appRoutes}</Routes>
            </BrowserRouter>
        </React.Suspense>
    );
};
