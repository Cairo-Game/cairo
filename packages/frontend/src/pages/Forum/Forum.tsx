import React, { FC, useState } from 'react';
import { Button, Card, Input, List, Modal, Row } from 'antd';
import { nanoid } from 'nanoid';

import { StyledButton, StyledListHeader } from './styles';

const Forum: FC = () => {
    const [themeList, setThemeList] = useState<{ title: string; id: string }[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [value, setValue] = useState('');

    const addTheme = () => {
        setThemeList((prev) => [...prev, { title: value, id: nanoid(6) }]);
    };

    const onOk = () => {
        if (!value) return;
        addTheme();
        setValue('');
        setIsModalVisible(false);
    };

    const onCancel = () => {
        setValue('');
        setIsModalVisible(false);
    };

    return (
        <Card bodyStyle={{ minHeight: '80vh' }}>
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
                dataSource={themeList}
                renderItem={({ title }) => <List.Item>{title}</List.Item>}
            />
            <Modal
                title="Добавление новой темы"
                visible={isModalVisible}
                footer={[
                    <Button type="primary" onClick={onOk}>
                        Добавить
                    </Button>,
                    <Button onClick={onCancel}>Отменить</Button>,
                ]}
            >
                <Input placeholder="Введите название темы" onChange={(e) => setValue(e.target.value)} value={value} />
            </Modal>
        </Card>
    );
};

export default Forum;
