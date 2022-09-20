import { EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Card, Descriptions, message, Skeleton } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/Redux';
import { useNavigate } from 'react-router-dom';
import './ProfileDescription.css';
import { dropRequestUserDataState, fetchUserInfoData, fetchUserLogout } from '../../store/actions/UserActions';
import { ProjectRoutes } from '../../constants/Routs';
import { EStatusLoading } from '../../models/Api/common';
import { createUserTheme, getUserTheme } from '../../api/UserTheme';
import { GetUser } from '../../api/User';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeVariants } from '../../enums/theme';
import { UserContext } from '../../context/UserContext';

const { Meta } = Card;

export const ProfileDescription = () => {
    const theme = useContext(ThemeContext);
    const userCustom = useContext(UserContext);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userInfoData = useAppSelector((state) => state.user.requestData?.userInfoData);
    const { userInfo: userData } = useAppSelector((state) => state.user);

    const [isLoading, setIsLoading] = useState(null);

    const darkTheme = theme?.state?.darkMode;

    useEffect(() => {
        !userData.id && dispatch(fetchUserInfoData());
        return () => {
            dispatch(dropRequestUserDataState());
        };
    }, []);

    useEffect(() => {
        if (!userData.id) {
            navigate(ProjectRoutes.login);
        }
        if (userInfoData.status === EStatusLoading.ERROR) {
            userInfoData.errorMessage && message.error(userInfoData.errorMessage);
        } else if (userInfoData.status === EStatusLoading.SUCCESS) {
            setIsLoading(false);
        }
    }, [userInfoData.status]);

    useEffect(() => {
        GetUser(userData.login).then((user) => {
            userCustom.dispatch({ id: user.data.id });
            getUserTheme(user.data.id).then((item) => theme.dispatch({ type: item.data.theme }));
        });
    }, [userData.login]);

    const handleClickLogout = () => {
        dispatch(fetchUserLogout(() => navigate(ProjectRoutes.login)));
    };

    const handleChangeTheme = (isDarkTheme?: boolean) => {
        console.log('dfbghjk');
        if (isDarkTheme) {
            createUserTheme({
                device: 'pc',
                ownerId: userCustom.state.id,
                themeId: '1',
                theme: ThemeVariants.LIGHTMODE,
            }).then((newtheme) => {
                theme.dispatch({ type: newtheme.data.theme });
            });
        } else {
            createUserTheme({
                device: 'pc',
                ownerId: userCustom.state.id,
                themeId: '2',
                theme: ThemeVariants.DARKMODE,
            }).then((newtheme) => {
                theme.dispatch({ type: newtheme.data.theme });
            });
        }
    };

    return (
        <>
            <Card
                actions={[
                    <EditOutlined key="edit" onClick={() => navigate(ProjectRoutes.profileSettings)} />,
                    <LogoutOutlined key="logout" onClick={() => handleClickLogout()} />,
                ]}
                className="description__card__content"
                size="default"
                bodyStyle={{ minHeight: '80vh' }}
            >
                <Skeleton loading={isLoading} avatar active>
                    {userData.avatar && (
                        <Meta
                            avatar={
                                <Avatar
                                    src={`${process.env.REACT_APP_API_ENDPOINT}/resources/${userData.avatar}`}
                                    className="description__avatar"
                                />
                            }
                            title={userData?.firstName}
                            style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                        />
                    )}
                    <Descriptions column={1} size="middle" className="description__card__info__content">
                        <Descriptions.Item label="Имя">{userData?.firstName}</Descriptions.Item>
                        <Descriptions.Item label="Фамилия">{userData?.secondName}</Descriptions.Item>
                        <Descriptions.Item label="Логин">{userData?.login}</Descriptions.Item>
                        <Descriptions.Item label="Почта">{userData?.email}</Descriptions.Item>
                        <Descriptions.Item label="Ник">{userData?.displayName}</Descriptions.Item>
                        <Descriptions.Item label="Телефон">{userData?.phone}</Descriptions.Item>
                    </Descriptions>
                </Skeleton>
            </Card>
            <div className={'changeThemeButton'} onClick={() => handleChangeTheme(darkTheme)}>
                {darkTheme ? 'Поменять на светлую тему' : 'Поменять на темную тему'}
            </div>
        </>
    );
};
