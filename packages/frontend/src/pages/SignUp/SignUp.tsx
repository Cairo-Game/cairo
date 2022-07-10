import React, {useEffect} from 'react';
import { Form, Input, SubmitButton, ResetButton} from 'formik-antd'
import { message, Typography, Button, Row, Col} from 'antd';
import {useAppDispatch, useAppSelector} from "hooks/Redux";
import {Formik} from 'formik'
import {fetchUserSignIn, fetchUserSignUp} from "store/actions/UserActions";
import {ISignUpData} from "models/Api/User.api";
import {Validation} from "utils/Validation";
import {history} from "utils/History";
const {Title} = Typography;

export const SignUp = () => {
    const dispatch = useAppDispatch();

    const {errorMessage} = useAppSelector(state => state.user.requestData);

    const onSubmit = (values: ISignUpData, actions) => {
            dispatch(fetchUserSignUp(values)).then(() => {
                actions.setSubmitting(false);
            });
        }
    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo);
    };

    useEffect( () => {
        errorMessage && message.error(errorMessage, 2);
    }, [errorMessage])

    const validateFormValues = (values: ISignUpData) => {
        const errors = {} as ISignUpData;
        Object.keys(values).forEach(key => {
            let result = Validation(key, values[key])
            if (result!== ""){
                errors[key] =result;
            }
        })
        console.log('validateFormValues', errors)
        return errors;
    }

    const initialValues = {} as ISignUpData;

    const handleClickSignInButton = () => {
        history.replace('/')
    }
    return (
        <>
            <Row>
                <Col offset={8}>
                    <Title level={2}>Регистрация</Title>
                </Col>
            </Row>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validateOnBlur={true}
                    validateOnChange={false} validate={validateFormValues} autoComplete={true}>
                <Form name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                    initialValues={{ remember: true }}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item name='first_name' label="Имя" >
                        <Input name='first_name' showCount={false}/>
                    </Form.Item>
                    <Form.Item name='second_name' label="Фамилия" >
                        <Input name='second_name' showCount={false}/>
                    </Form.Item>
                    <Form.Item name='login' label="Логин" >
                        <Input name='login'/>
                    </Form.Item>
                    <Form.Item name='email' label="Почта" >
                        <Input name='email'  />
                    </Form.Item>
                    <Form.Item name='password' label="Пароль" >
                        <Input.Password name='password' />
                    </Form.Item>
                    <Form.Item name='phone' label="Телефон" >
                        <Input name='phone' />
                    </Form.Item>
                    <SubmitButton />
                    <ResetButton />
                    <Row>
                        <Col offset={12}>
                            <SubmitButton>Зарегистрироваться</SubmitButton>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={12}>
                            <Button type="link" onClick={handleClickSignInButton}>
                                Войти
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </>
    );
}