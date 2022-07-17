import React from 'react';
import { ProjectRoutes } from 'constants/Routs';
import { AuthLayout } from '../layouts/AuthLayout/AuthLayout';
import { Login } from '../pages/Login/Login';
import { SignUp } from '../pages/SignUp/SignUp';
import { IRoute } from './interfaces/IRouter';
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { ProfileDescription } from '../pages/ProfileDescription/ProfileDescription';
import { ProfileSettings } from '../pages/ProfileSettings/ProfileSettings';

export const routes: IRoute[] = [
    {
        path: '',
        component: <AuthLayout />,
        children: [
            {
                path: '',
                component: <Login />,
            },
            {
                path: ProjectRoutes.signUp,
                component: <SignUp />,
            },
        ],
    },
    {
        path: '',
        component: <MainLayout />,
        children: [
            {
                path: ProjectRoutes.profileDescription,
                component: <ProfileDescription />,
            },
            {
                path: ProjectRoutes.profileSettings,
                component: <ProfileSettings />,
            },
        ],
    },
];

{
    /* <Routes>
<Route
    path={ProjectRoutes.login}
    element={
        <AuthLayout>
            <Login />
        </AuthLayout>
    }
/>
<Route
    path={ProjectRoutes.signUp}
    element={
        <AuthLayout>
            <SignUp />
        </AuthLayout>
    }
/>
<Route path={ProjectRoutes.profileDescription} element={<ProfileDescription />} />
<Route path={ProjectRoutes.profileSettings} element={<ProfileSettings />} />
</Routes> */
}
