import React, { FC, useState } from 'react';
import { Button, Input, Modal, Row } from 'antd';
//import { nanoid } from 'nanoid';
import { useAppDispatch } from '../../../../hooks/Redux';

import { addTopic } from '../../../../store/slices/ForumSlice';
import { TAddTopicFormProps } from './types';

const AddTopicForm: FC<TAddTopicFormProps> = ({ isOpen, closeForm }) => {
    const dispatch = useAppDispatch();

    const [titleValue, setTitleValue] = useState('');
    const [messageValue, setMessageValue] = useState('');

    const onOk = () => {
        if (!titleValue) return;
        dispatch(addTopic({ id: '1', title: titleValue, message: messageValue, comments: [] }));
        setTitleValue('');
        setMessageValue('');
        closeForm();
    };

    const onCancel = () => {
        setTitleValue('');
        setMessageValue('');
        closeForm();
    };

    return (
        <Modal
            title="Добавление новой темы"
            visible={isOpen}
            onCancel={onCancel}
            footer={[
                <Button key="onOk" type="primary" onClick={onOk}>
                    Добавить
                </Button>,
                <Button key="onCancel" onClick={onCancel}>
                    Отменить
                </Button>,
            ]}
        >
            <Row gutter={[16, 16]}>
                <Input
                    placeholder="Введите название темы"
                    onChange={(e) => setTitleValue(e.target.value)}
                    value={titleValue}
                />
                <Input.TextArea
                    placeholder="Добавьте первое сообщение"
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}
                />
            </Row>
        </Modal>
    );
};

export default AddTopicForm;
