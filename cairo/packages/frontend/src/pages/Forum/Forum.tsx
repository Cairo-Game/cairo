import React, { FC, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Card } from 'antd';

import TopicList from './components/TopicList';
import AddTopicForm from './components/AddTopicForm';

const Forum: FC = () => {
    const { topicId } = useParams();
    const [isOpenForm, setIsOpenForm] = useState(false);

    return (
        <>
            <Card bodyStyle={{ padding: 40 }}>
                {topicId ? <Outlet /> : <TopicList openForm={() => setIsOpenForm(true)} />}
            </Card>
            <AddTopicForm isOpen={isOpenForm} closeForm={() => setIsOpenForm(false)} />
        </>
    );
};

export default Forum;
