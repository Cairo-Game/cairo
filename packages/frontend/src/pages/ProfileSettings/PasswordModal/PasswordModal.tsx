import {Button, Col, message, Modal, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import {Form, Input, SubmitButton} from "formik-antd";
import {Formik} from "formik";
import {EPasswordFields, IPasswordForm, IUserProfileUpdateData} from "models/Api/User.api";
import {dropRequestUserDataState, fetchUpdateUserPassword, fetchUpdateUserProfile} from "store/actions/UserActions";
import {useAppDispatch, useAppSelector} from "hooks/Redux";
import {EStatusLoading} from "models/Api/common";
import 'pages/ProfileDescription/ProfileDescription.css';

const initialValues:IPasswordForm = {
    oldPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
}

export const PasswordModal = (props) => {

    const {isModalVisible, onChangeVisibilityCallback} = props;
    const dispatch = useAppDispatch();
    const updateProfilePasswordData = useAppSelector((state) => state.user.requestData?.updateProfilePassword);

    const [isVisible, setIsVisible] = useState(isModalVisible);

    const validateFormValues = (values: IPasswordForm) => {
        const errors = {} as IPasswordForm;
        Object.keys(EPasswordFields).forEach((key) => {
            if (values[key] === ''){
                errors[key] = 'Поле не заполнено';
            }
        });
        if (values.newPassword!==values.newPasswordRepeat){
            errors.newPasswordRepeat = 'Значения не совпадают'
            errors.newPassword = 'Значения не совпадают'
        }
        return errors;
    }

    useEffect(() => {
        if (updateProfilePasswordData.status === EStatusLoading.ERROR) {
            updateProfilePasswordData.errorMessage && message.error(updateProfilePasswordData.errorMessage, 2);
        }
        else if (updateProfilePasswordData.status === EStatusLoading.SUCCESS) {
            message.info('Пароль успешно обновлен',2)
            setIsVisible(false)
        }
    }, [updateProfilePasswordData.status]);

    useEffect(() => {
        return () => {
            dispatch(dropRequestUserDataState());
        };
    }, []);

    useEffect(() => {
        onChangeVisibilityCallback(isVisible)
    }, [isVisible]);

    useEffect(() => {
        setIsVisible(isModalVisible)
    }, [props]);

    const onSubmit = (values: IPasswordForm, actions) => {
        dispatch(fetchUpdateUserPassword(values)).then(() => {
            actions.setSubmitting(false);
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo,2);
    };

    return (
            <Modal title="Basic Modal" visible={isVisible} onCancel={() => setIsVisible(false)} destroyOnClose={true} footer={null}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validateOnBlur={true}
                    validate={validateFormValues}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                        initialValues={{ remember: true }}
                        style={{ marginTop: 20 }}
                        onFinishFailed={onFinishFailed}
                    >
                        {Object.keys(EPasswordFields).map((key, index) => (
                            <Form.Item name={key} key={index} label={EPasswordFields[key]}>
                                <Input.Password name={key} />
                            </Form.Item>
                        ))}
                        <Row className="button__group">
                            <Col>
                                <SubmitButton shape="round" onClick={()=>{}}>Сохранить</SubmitButton>
                            </Col>
                            <Col>
                                <Button type="link" shape="round" onClick={() => setIsVisible(false)}>
                                    Назад
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Formik>
            </Modal>
    );
};