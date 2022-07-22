import React from 'react';
import { ProjectRoutes } from 'constants/Routs';
import { AuthLayout } from '../layouts/AuthLayout/AuthLayout';
import { Login } from '../pages/Login/Login';
import { SignUp } from '../pages/SignUp/SignUp';
import { IRoute } from './interfaces/IRouter';
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { ProfileDescription } from '../pages/ProfileDescription/ProfileDescription';
import { ProfileSettings } from '../pages/ProfileSettings/ProfileSettings';
import { StartScreen } from '../pages/GamePage/StartScreen';
import { Rating } from '../pages/Rating/Rating';
import Forum from 'pages/Forum';
import TopicDiscussion from 'pages/Forum/components/TopicDiscussion';

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
            {
                path: ProjectRoutes.gamePage,
                component: <StartScreen />,
            },
            {
                path: ProjectRoutes.rating,
                component: <Rating />,
            },
            {
                path: ProjectRoutes.forum,
                component: <Forum />,
                children: [
                    {
                        path: ':topicId',
                        component: <TopicDiscussion />,
                    },
                ],
            },
        ],
    },
];
