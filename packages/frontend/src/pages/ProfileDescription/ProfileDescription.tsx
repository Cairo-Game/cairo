import { EditOutlined, LogoutOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import {Avatar, Card, Descriptions, message, Skeleton, Switch} from 'antd';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "hooks/Redux";
import {useNavigate} from "react-router-dom";
import {IUser} from "models/Entity/User";
import './ProfileDescription.css'
import {fetchUserData, fetchUserLogout} from "store/actions/UserActions";
import {ProjectRoutes} from "constants/Routs";


const { Meta } = Card;

export const ProfileDescription = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {userInfo: userData, requestData} = useAppSelector(state => state.user);
    const [isLoaded, setIsLoaded] = useState(null);

    useEffect(
        ()=>{
            dispatch(fetchUserData())
        }, []
    )
    useEffect(
        ()=>{
            if (requestData.isLoading === null){
                setIsLoaded(true)
            } else {
                if (requestData.errorMessage)
                    {
                        message.error(requestData.errorMessage, 2)
                    }
                setIsLoaded(false)
            }
        }, [requestData.isLoading]
    )

    return (
                <Card
                    actions={[
                        //TODO Добавить роут для кнопки Назад когда появится куда
                        <ArrowLeftOutlined key="goBack"/>,
                        <EditOutlined key="edit" onClick={()=>navigate(ProjectRoutes.profileSettings)}/>,
                        <LogoutOutlined key="logout" onClick={()=>dispatch(fetchUserLogout())}/>
                    ]}
                    className="description__box"
                >
                    <Skeleton loading={isLoaded} avatar active
                              className='description__box'  style={{justifyContent:"center"}}>
                        {userData.avatar &&
                            <Meta
                                avatar={<Avatar src={`${process.env.REACT_APP_API_ENDPOINT}/resources/${userData.avatar}`} />}
                                title={userData?.firstName}
                                style={{justifyContent:"center"}}
                            />}
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Имя">{userData?.firstName}</Descriptions.Item>
                            <Descriptions.Item label="Фамилия">{userData?.secondName}</Descriptions.Item>
                            <Descriptions.Item label="Логин">{userData?.login}</Descriptions.Item>
                            <Descriptions.Item label="Почта">{userData?.email}</Descriptions.Item>
                            <Descriptions.Item label="Ник">{userData?.displayName}</Descriptions.Item>
                            <Descriptions.Item label="Телефон">{userData?.phone}</Descriptions.Item>
                        </Descriptions>
                    </Skeleton>
                </Card>
    );
}