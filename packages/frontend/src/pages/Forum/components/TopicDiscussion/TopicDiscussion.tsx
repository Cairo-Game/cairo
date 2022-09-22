import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../hooks/Redux';
import { Typography, Divider, Input, Button, List, Card, Modal } from 'antd';
//import { nanoid } from 'nanoid';

import { addComment, addAnswerToComment, setTopic } from '../../../../store/slices/ForumSlice';
import { StyledWrapper } from './styles';

const TopicDiscussion: FC = () => {
    const navigate = useNavigate();

    const { topic, topicList } = useAppSelector((state) => state.forum);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!topic && topicList.length > 0) {
            dispatch(setTopic(topicList[0].id));
        }
    }, [topic, topicList]);

    const [messageValue, setMessageValue] = useState('');
    const [answerValue, setAnswerValue] = useState('');
    const [isVisibleAnswerField, setIsVisibleAnswerField] = useState(false);
    const [commentId, setCommentId] = useState<string | null>(null);

    const handleAddComment = () => {
        if (messageValue) {
            dispatch(addComment({ id: '2', message: messageValue, answers: [] }));
            setMessageValue('');
        }
    };

    const handleAddAnswer = () => {
        console.log('topicList ', topicList);
        console.log('id ', commentId);
        if (answerValue && commentId) {
            dispatch(addAnswerToComment({ id: commentId, answer: answerValue }));
            setAnswerValue('');
            setIsVisibleAnswerField(false);
        }
    };

    return (
        <StyledWrapper>
            <Button style={{ alignSelf: 'flex-start' }} type="link" onClick={() => navigate(-1)}>
                {'< Назад'}
            </Button>
            <Typography.Text style={{ fontSize: 26 }}>{topic?.title}</Typography.Text>
            <Divider style={{ margin: '10px 0' }} />
            <Typography.Text>{topic?.message}</Typography.Text>
            <Divider style={{ margin: '10px 0' }} />
            <Typography.Text style={{ fontSize: 20 }}>Комментарии:</Typography.Text>
            <List
                dataSource={topic?.comments}
                renderItem={({ id, message, answers }) => (
                    <List.Item
                        key={id}
                        style={{
                            position: 'relative',
                            padding: '8px 8px 24px 8px',
                            display: 'flex',
                            flexDirection: 'column',
                            border: 'none',
                        }}
                    >
                        <Card style={{ width: '100%' }}>{message}</Card>
                        <Modal
                            title="Добавить ответ"
                            visible={isVisibleAnswerField}
                            onCancel={() => setIsVisibleAnswerField(false)}
                            footer={[
                                <Button key="onOk" type="primary" onClick={handleAddAnswer}>
                                    Добавить
                                </Button>,
                                <Button key="onCancel" onClick={() => setIsVisibleAnswerField(false)}>
                                    Отменить
                                </Button>,
                            ]}
                        >
                            <Input.TextArea
                                style={{ maxWidth: 800 }}
                                placeholder="Введите сообщение"
                                value={answerValue}
                                onChange={(e) => setAnswerValue(e.target.value)}
                            />
                        </Modal>
                        <Button
                            type="link"
                            style={{ position: 'absolute', right: 10, top: 54, padding: 0 }}
                            onClick={() => {
                                setCommentId(id);

                                setIsVisibleAnswerField(true);
                            }}
                        >
                            Ответить
                        </Button>
                        <List
                            style={{ width: '100%', marginLeft: 80 }}
                            dataSource={answers}
                            locale={{ emptyText: '.' }}
                            renderItem={(answer) => (
                                <List.Item style={{ border: 'none', padding: '4px 0' }}>
                                    <Card style={{ width: '100%' }}>{answer}</Card>
                                </List.Item>
                            )}
                        />
                    </List.Item>
                )}
                locale={{ emptyText: 'Пока нет комментариев к этой теме' }}
                style={{ maxWidth: 800 }}
            />
            <Divider style={{ margin: '10px' }} />
            <Typography.Text style={{ fontSize: 20 }}>Добавить комментарий</Typography.Text>
            <Input.TextArea
                style={{ maxWidth: 800, minHeight: 200 }}
                placeholder="Введите сообщение"
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
            />
            <Button style={{ maxWidth: 180 }} onClick={handleAddComment}>
                Добавить
            </Button>
        </StyledWrapper>
    );
};

export default TopicDiscussion;
