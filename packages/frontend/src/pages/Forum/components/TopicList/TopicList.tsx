import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, List, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../hooks/Redux';

import { setTopic, removeTopic } from '../../../../store/slices/ForumSlice';
import { TTopicListProps } from './types';
import { StyledButton, StyledListHeader } from './styles';

const TopicList: FC<TTopicListProps> = ({ openForm }) => {
    const { topicList } = useAppSelector((state) => state.forum);
    const dispatch = useAppDispatch();

    return (
        <List
            header={
                <Row align="middle">
                    <StyledListHeader>Темы обсуждения</StyledListHeader>
                    <StyledButton type="text" onClick={openForm} style={{ color: 'blue' }}>
                        Создать новую тему
                    </StyledButton>
                </Row>
            }
            pagination={{
                pageSize: 10,
            }}
            bordered
            locale={{ emptyText: 'Тем нет, создайте новую.' }}
            dataSource={topicList}
            renderItem={({ title, id }) => (
                <List.Item key={id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link to={id} onClick={() => dispatch(setTopic(id))}>
                        {title}
                    </Link>
                    <Button danger type="text" onClick={() => dispatch(removeTopic(id))}>
                        Удалить
                    </Button>
                </List.Item>
            )}
        />
    );
};

export default TopicList;
