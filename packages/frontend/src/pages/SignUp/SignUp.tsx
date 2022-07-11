import React, {useEffect} from 'react';
import { Form, Input, SubmitButton, ResetButton} from 'formik-antd'
import { message, Typography, Button, Row, Col} from 'antd';
import {useAppDispatch, useAppSelector} from "hooks/Redux";
import {Formik} from 'formik'
import {dropRequestUserDataState, fetchUserSignUp} from "store/actions/UserActions";
import {ISignUpData} from "models/Api/User.api";
import {Validation} from "utils/Validation";
import {useNavigate} from "react-router-dom";
import {ProjectRoutes} from "constants/Routs";
const {Title} = Typography;

const initialValues: ISignUpData = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: ''
}
export const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {isLoading, errorMessage} = useAppSelector(state => state.user.requestData);

    const onSubmit = (values: ISignUpData, actions) => {
            dispatch(fetchUserSignUp(values)).then(() => {
                actions.setSubmitting(false);
            });
        }
    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo);
    };

    useEffect( () => {
        if (isLoading===false){
            errorMessage && message.error(errorMessage, 2);
        } else if (isLoading===true){
            navigate(ProjectRoutes.login)
        }
        return () => {
            dispatch(dropRequestUserDataState())
        }
    }, [isLoading])

    const validateFormValues = (values: ISignUpData) => {
        const errors = {} as ISignUpData;
        Object.keys(values).forEach(key => {
            let result = Validation(key, values[key])
            if (result!== ""){
                errors[key] =result;
            }
        })
        console.log('errors', errors)
        return errors;
    }

    const handleClickSignInButton = () => {
        navigate(ProjectRoutes.login)
    }
    return (
        <>
            <Row>
                <Col offset={8}>
                    <Title level={2}>Регистрация</Title>
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
                        <Col offset={8}>
                            <SubmitButton>Зарегистрироваться</SubmitButton>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={8}>
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