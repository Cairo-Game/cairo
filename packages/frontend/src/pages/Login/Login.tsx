import React, { useEffect } from 'react';
import { Form, Input, SubmitButton } from 'formik-antd';
import { Button, Col, message, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/Redux';
import { Formik } from 'formik';
import { dropRequestUserDataState, fetchUserInfoData, fetchUserSignIn } from 'store/actions/UserActions';
import { ILoginData, ISignUpData } from 'models/Api/User.api';
import { Validation } from 'utils/Validation';
import { useNavigate } from 'react-router-dom';
import { ProjectRoutes } from 'constants/Routs';
import { EStatusLoading } from 'models/Api/common';

const initialValues: ILoginData = {
    password: '',
    login: '',
};

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { userInfo } = useAppSelector((state) => state.user);
    const userInfoData = useAppSelector((state) => state.user.requestData?.userInfoData);
    const signInData = useAppSelector((state) => state.user.requestData?.signInData);

    const onSubmit = (values: ILoginData, actions) => {
        dispatch(fetchUserSignIn(values)).then(() => {
            actions.setSubmitting(false);
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo);
    };
    
    useEffect(() => {
        if (signInData?.status === EStatusLoading.SUCCESS || userInfo.id) {
            navigate(ProjectRoutes.profileDescription);
        } else if (signInData?.status === EStatusLoading.ERROR) {
            signInData?.errorMessage && message.error(signInData?.errorMessage);
        }
        return () => {
            dispatch(dropRequestUserDataState());
        };
    }, [signInData?.status, userInfoData?.status]);

    useEffect(() => {
        dispatch(fetchUserInfoData());
        return () => {
            dispatch(dropRequestUserDataState());
        };
    }, []);

    useEffect(() => {
        if (userInfo.id !== null) {
            navigate(ProjectRoutes.profileDescription);
        }
    }, [userInfo.id]);

    const validateFormValues = (values: ILoginData) => {
        const errors = {} as ISignUpData;
        Object.keys(values).forEach((key) => {
            let result = Validation(key, values[key]);
            if (result !== '') {
                errors[key] = result;
            }
        });
        return errors;
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validateOnBlur={true} validate={validateFormValues}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item name="login" label="Логин">
                    <Input name="login" />
                </Form.Item>
                <Form.Item name="password" label="Пароль">
                    <Input.Password name="password" />
                </Form.Item>
                <Row className="button__group">
                    <Col>
                        <SubmitButton shape="round">Войти</SubmitButton>
                    </Col>
                    <Col>
                        <Button type="link" href={ProjectRoutes.signUp}>
                            Нет аккаунта?
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Formik>
    );
};
