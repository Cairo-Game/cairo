import React from 'react';
import { useAppSelector } from 'hooks/Redux';
import { Typography } from 'antd';

import { StyledTopicTitle, StyledWrapper } from './styles';

const TopicDiscussion = () => {
    const {
        topic: { title, message },
    } = useAppSelector((state) => state.forum);

    return (
        <StyledWrapper>
            <StyledTopicTitle>{title}</StyledTopicTitle>
            <Typography.Text>{message}</Typography.Text>
        </StyledWrapper>
    );
};

export default TopicDiscussion;
