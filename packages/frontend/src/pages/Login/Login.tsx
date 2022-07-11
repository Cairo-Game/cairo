import React, {useEffect} from 'react';
import {Form, Input, ResetButton, SubmitButton} from 'formik-antd'
import {Button, Col, message, Row} from 'antd';
import {useAppDispatch, useAppSelector} from "hooks/Redux";
import {Formik} from 'formik'
import {fetchUserSignIn} from "store/actions/UserActions";
import {ILoginData, ISignUpData} from "models/Api/User.api";
import {Validation} from "utils/Validation";
import {useNavigate} from "react-router-dom";
import {ProjectRoutes} from "constants/Routs";

const initialValues: ILoginData = {
    password: "",
    login: ""
};

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {errorMessage} = useAppSelector(state => state.user.requestData)
    const onSubmit = (values: ILoginData) => {
        dispatch(fetchUserSignIn(values))
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo);
    };

    useEffect( () => {
       errorMessage && message.error(errorMessage, 2);
    }, [errorMessage])

    const validateFormValues = (values: ILoginData) => {
        const errors = {} as ISignUpData;
        Object.keys(values).forEach(key => {
            let result = Validation(key, values[key])
            if (result!== ""){
                errors[key] =result;
            }
        })
        return errors;
    }

    const handleClickSignUpButton = () => {
        navigate(ProjectRoutes.signUp)
    }

    return (
            <Formik initialValues={initialValues} onSubmit={onSubmit} validateOnBlur={true}
                    validate={validateFormValues}>
                <Form name="basic"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 8 }}
                      initialValues={{ remember: true }}
                      onFinishFailed={onFinishFailed}>
                    <Form.Item name='login' label="Логин" >
                        <Input name='login'/>
                    </Form.Item>
                    <Form.Item name='password' label="Пароль" >
                        <Input.Password name='password' />
                    </Form.Item>
                    <SubmitButton />
                    <ResetButton />
                    <Row>
                        <Col offset={12}>
                            <SubmitButton>Войти</SubmitButton>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={12}>
                            <Button type="link" onClick={handleClickSignUpButton} formNoValidate={true}>
                                Нет аккаунта?
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
    );
};