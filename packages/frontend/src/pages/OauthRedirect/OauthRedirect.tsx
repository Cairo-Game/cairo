import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { postOauth } from '../../api/Oauth';
import { ProjectRoutes } from '../../constants/Routs';
import { REDIRECT_URI } from '../Login/Login';
import { Container } from './OauthRedirect.style';

export const OauthRedirect = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get('code');
    const navigate = useNavigate();

    useEffect(() => {
        if (code) {
            postOauth({ code: code, redirect_uri: REDIRECT_URI })
                .then((data) => {
                    if (data.data === 'Ok') {
                        navigate(ProjectRoutes.profileDescription);
                    }
                })
                .catch(() => {
                    navigate(ProjectRoutes.login);
                });
        }
    }, [code]);

    return <Container>Поздравляем! Вы почти вошли!</Container>;
};
