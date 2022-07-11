import React, {useEffect} from 'react';
import {Form, Input, ResetButton, SubmitButton} from 'formik-antd'
import {Button, Col, message, Row} from 'antd';
import {useAppDispatch, useAppSelector} from "hooks/Redux";
import {Formik} from 'formik'
import {dropRequestUserDataState, fetchUserData, fetchUserSignIn} from "store/actions/UserActions";
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

    const {userInfo, requestData} = useAppSelector(state => state.user)
    const onSubmit = (values: ILoginData, actions) => {
        dispatch(fetchUserSignIn(values)).then(() => {
            actions.setSubmitting(false);
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo);
    };

    useEffect( () => {
            if (requestData.isLoading===false){
                requestData.errorMessage && message.error(requestData.errorMessage, 2);
            } else if (requestData.isLoading===true){
                navigate(ProjectRoutes.profileDescription)
            }
            return () => {
                dispatch(dropRequestUserDataState())
            }
        }, [requestData.isLoading])

    useEffect( () => {
        dispatch(fetchUserData())
        return () => {
            dispatch(dropRequestUserDataState())
        }
    }, [])

    useEffect( () => {
        if (userInfo.id!==null){
            navigate(ProjectRoutes.profileDescription)
        }
    }, [userInfo.id])

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
                    <Row className="button__group">
                        <Col>
                            <SubmitButton  shape="round">Войти</SubmitButton>
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