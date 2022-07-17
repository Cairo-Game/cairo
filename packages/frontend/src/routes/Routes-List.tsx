import React from 'react';
import { ProjectRoutes } from 'constants/Routs';
import { AuthLayout } from '../layouts/AuthLayout/AuthLayout';
import { Login } from '../pages/Login/Login';
import { SignUp } from '../pages/SignUp/SignUp';
import { IRoute } from './interfaces/IRouter';
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { ProfileDescription } from '../pages/ProfileDescription/ProfileDescription';
import { ProfileSettings } from '../pages/ProfileSettings/ProfileSettings';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { StartScreen } from '../pages/GamePage/StartScreen';
import { Rating } from '../pages/Rating/Rating';

export const routes: IRoute[] = [
    {
        path: '',
        component: <AuthLayout />,
        children: [
            {
                path: '',
                component: (
                    <ErrorBoundary>
                        <Login />
                    </ErrorBoundary>
                ),
            },
            {
                path: ProjectRoutes.signUp,
                component: (
                    <ErrorBoundary>
                        <SignUp />
                    </ErrorBoundary>
                ),
            },
        ],
    },
    {
        path: '',
        component: <MainLayout />,
        children: [
            {
                path: ProjectRoutes.profileDescription,
                component: (
                    <ErrorBoundary>
                        <ProfileDescription />
                    </ErrorBoundary>
                ),
            },
            {
                path: ProjectRoutes.profileSettings,
                component: (
                    <ErrorBoundary>
                        <ProfileSettings />
                    </ErrorBoundary>
                ),
            },
            {
                path: ProjectRoutes.gamePage,
                component: <StartScreen />,
            },
            {
                path: ProjectRoutes.rating,
                component: <Rating />,
            },
        ],
    },
];
