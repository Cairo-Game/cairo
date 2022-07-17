import React, { FC, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Button, Card, Input, List, Modal, Row } from 'antd';
import { nanoid } from 'nanoid';
import { useAppDispatch, useAppSelector } from 'hooks/Redux';

import { addTopic, setTopic } from 'store/slices/ForumSlice';
import { StyledButton, StyledListHeader } from './styles';

const Forum: FC = () => {
    const { topicId } = useParams();
    const dispatch = useAppDispatch();
    const { topicList } = useAppSelector((state) => state.forum);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const [messageValue, setMessageValue] = useState('');

    const onOk = () => {
        if (!titleValue) return;
        dispatch(addTopic({ id: nanoid(6), title: titleValue, message: messageValue }));
        setTitleValue('');
        setMessageValue('');
        setIsModalVisible(false);
    };

    const onCancel = () => {
        setTitleValue('');
        setMessageValue('');
        setIsModalVisible(false);
    };

    return (
        <Card bodyStyle={{ minHeight: '85vh' }}>
            {topicId ? (
                <Outlet />
            ) : (
                <List
                    header={
                        <Row align="middle">
                            <StyledListHeader>Темы обсуждения</StyledListHeader>
                            <StyledButton type="text" onClick={() => setIsModalVisible(true)} style={{ color: 'blue' }}>
                                Создать новую тему
                            </StyledButton>
                        </Row>
                    }
                    pagination={{
                        pageSize: 10,
                    }}
                    bordered
                    dataSource={topicList}
                    renderItem={({ title, id }) => (
                        <List.Item key={id}>
                            <Link to={id} onClick={() => dispatch(setTopic(id))}>
                                {title}
                            </Link>
                        </List.Item>
                    )}
                />
            )}

            <Modal
                title="Добавление новой темы"
                visible={isModalVisible}
                onCancel={onCancel}
                footer={[
                    <Button type="primary" onClick={onOk}>
                        Добавить
                    </Button>,
                    <Button onClick={onCancel}>Отменить</Button>,
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
        </Card>
    );
};

export default Forum;
