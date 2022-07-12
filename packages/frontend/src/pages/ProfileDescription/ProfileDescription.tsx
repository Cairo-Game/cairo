import { EditOutlined, LogoutOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import {Avatar, Card, Descriptions, message, Skeleton, Switch} from 'antd';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "hooks/Redux";
import {useNavigate} from "react-router-dom";
import './ProfileDescription.css'
import {dropRequestUserDataState, fetchUserInfoData, fetchUserLogout} from "store/actions/UserActions";
import {ProjectRoutes} from "constants/Routs";
import {EStatusLoading} from "models/Api/common";


const { Meta } = Card;

export const ProfileDescription = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userInfoData = useAppSelector(state => state.user.requestData?.userInfoData)
    const {userInfo: userData} = useAppSelector(state => state.user)

    const [isLoading, setIsLoading] = useState(null);

    useEffect(
        ()=>{
            dispatch(fetchUserInfoData())
            return () => {
                dispatch(dropRequestUserDataState())
            }
        }, []
    )
    useEffect(
        ()=>{
            if (!userData.id){
                navigate(ProjectRoutes.login)
            } if (userInfoData.status===EStatusLoading.ERROR){
                userInfoData.errorMessage&&message.error(userInfoData.errorMessage);
            } else if (userInfoData.status===EStatusLoading.SUCCESS){
                setIsLoading(false);
            }
        }, [userInfoData.status]
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
                    <Skeleton loading={isLoading} avatar active
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