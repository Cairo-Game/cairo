import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectRoutes } from './Routs';

export const MenuItems = [
    {
        label: <Link to={ProjectRoutes.profileDescription}>{'Профиль'}</Link>,
        key: ProjectRoutes.profileDescription,
    },
    {
        label: <Link to={ProjectRoutes.gamePage}>{'Игра'}</Link>,
        key: ProjectRoutes.gamePage,
    },
    {
        label: <Link to={ProjectRoutes.forum}>{'Форум'}</Link>,
        key: ProjectRoutes.forum,
    },
];
