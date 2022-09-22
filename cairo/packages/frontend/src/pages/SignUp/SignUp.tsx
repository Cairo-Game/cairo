import React, { useEffect } from 'react';
import { Form, Input, SubmitButton, ResetButton } from 'formik-antd';
import { message, Typography, Button, Row, Col } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/Redux';
import { Formik } from 'formik';
import { dropRequestUserDataState, fetchUserSignUp } from '../../store/actions/UserActions';
import { ISignUpData } from '../../models/Api/User.api';
import { Validation } from '../../utils/Validation';
import { useNavigate } from 'react-router-dom';
import { ProjectRoutes } from '../../constants/Routs';
import { EStatusLoading } from '../../models/Api/common';
import './SignUp.css';
import { CreateUser } from '../../api/User';

const { Title } = Typography;

const initialValues: ISignUpData = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
};
export const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const signUpData = useAppSelector((state) => state.user.requestData?.signUpData);

    const onSubmit = (values: ISignUpData, actions) => {
        CreateUser({
            firstName: values.first_name,
            secondName: values.second_name,
            login: values.login,
            email: values.email,
            phone: values.phone,
        });
        dispatch(fetchUserSignUp(values)).then(() => {
            actions.setSubmitting(false);
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo);
    };

    useEffect(() => {
        if (signUpData?.status === EStatusLoading.SUCCESS) {
            navigate(ProjectRoutes.profileDescription);
        } else if (signUpData?.status === EStatusLoading.ERROR) {
            signUpData?.errorMessage && message.error(signUpData?.errorMessage);
        }
        return () => {
            dispatch(dropRequestUserDataState());
        };
    }, [signUpData?.status]);

    const validateFormValues = (values: ISignUpData) => {
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
        <>
            <Row className="sign__up__header">
                <Col>
                    <Title level={2}>Регистрация</Title>
                </Col>
            </Row>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validateOnBlur={true}
                validate={validateFormValues}
                autoComplete={true}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                    initialValues={{ remember: true }}
                    onFinishFailed={onFinishFailed}
                    style={{ marginTop: 20 }}
                >
                    <Form.Item name="first_name" label="Имя">
                        <Input name="first_name" showCount={false} />
                    </Form.Item>
                    <Form.Item name="second_name" label="Фамилия">
                        <Input name="second_name" showCount={false} />
                    </Form.Item>
                    <Form.Item name="login" label="Логин">
                        <Input name="login" />
                    </Form.Item>
                    <Form.Item name="email" label="Почта">
                        <Input name="email" />
                    </Form.Item>
                    <Form.Item name="password" label="Пароль">
                        <Input.Password name="password" />
                    </Form.Item>
                    <Form.Item name="phone" label="Телефон">
                        <Input name="phone" />
                    </Form.Item>
                    <SubmitButton />
                    <ResetButton />
                    <Row className="button__group">
                        <Col>
                            <SubmitButton block shape="round">
                                Зарегистрироваться
                            </SubmitButton>
                        </Col>
                        <Col>
                            <Button type="link" onClick={() => navigate(ProjectRoutes.login)} block>
                                Войти
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </>
    );
};
