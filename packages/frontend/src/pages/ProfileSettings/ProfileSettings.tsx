import { EditOutlined, LogoutOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import {Avatar, Button, Card, Col, message, Row, Skeleton, Switch, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "hooks/Redux";
import {useNavigate} from "react-router-dom";
import './ProfileDescription.css'
import {
    dropRequestUserDataState,
    fetchUpdateUserProfile,
    fetchUserData,
} from "store/actions/UserActions";
import {Formik} from "formik";
import {Form, Input, SubmitButton} from "formik-antd";
import {IUserProfileUpdateData} from "models/Api/User.api";
import {ProjectRoutes} from "constants/Routs";
import {Validation} from "utils/Validation";
import {EUserProfileFileds} from "models/Common";

const {Title} = Typography;

export const ProfileSettings = () => {
    const dispatch = useAppDispatch();

    const {requestData, userInfo} = useAppSelector(state => state.user);
    const [isLoaded, setIsLoaded] = useState<boolean>(!userInfo.id);

    //TODO Поменять значения на те что в стейте когда заработает апишка
    const initialValues: IUserProfileUpdateData = {
        first_name: 'Арчибальд',
        second_name: 'Котиков',
        login: '',
        email: '',
        display_name: '',
        phone: ''
    }

    const onSubmit = (values: IUserProfileUpdateData, actions) => {
        dispatch(fetchUpdateUserProfile(values)).then(() => {
            actions.setSubmitting(false);
        });
    }
    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo);
    };

    useEffect( () => {
        if (!userInfo.id){
            dispatch(fetchUserData()).then(() => setIsLoaded(false))
        }
        return () => {
            dispatch(dropRequestUserDataState())
        }
    }, [])

    useEffect(()=>{
        requestData.errorMessage && message.error(requestData.errorMessage, 2);
    }, [requestData.isLoading])

    const validateFormValues = (values: IUserProfileUpdateData) => {
        const errors = {} as IUserProfileUpdateData;
        Object.keys(values).forEach(key => {
            let result = Validation(key, values[key])
            if (result!== ""){
                errors[key] =result;
            }
        })
        return errors;
    }

    return (
        <Skeleton loading={isLoaded}>
            <Row>
                <Col offset={8}>
                    <Title level={2}>Настройки профиля</Title>
                </Col>
            </Row>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validateOnBlur={true}
                    validate={validateFormValues} autoComplete={true}>
                <Form name="basic"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 8 }}
                      initialValues={{ remember: true }}
                      onFinishFailed={onFinishFailed}
                      style={{marginTop: 20}}>
                    {Object.keys(EUserProfileFileds).map((key, index) =>
                        (
                            <Form.Item name={key} key={index} label={EUserProfileFileds[key]} >
                                <Input name={key}/>
                            </Form.Item>
                        )
                    )}
                    <Row className="button__group">
                        <Col>
                            <SubmitButton shape="round">Сохранить</SubmitButton>
                        </Col>
                        <Col>
                            <Button type="link" href={ProjectRoutes.profileDescription} shape="round">
                                Назад
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </Skeleton>
    );
}