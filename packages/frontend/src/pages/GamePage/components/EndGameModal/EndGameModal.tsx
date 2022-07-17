import React, { FC, useEffect } from 'react';
import { Button } from 'antd';

import Modal from 'components/Layouts/Modal';
import { StyledContainer, StyledTitle } from './styles';

type TEndGameModal = {
    isOpen: boolean;
    closeModal: () => void;
    text: string;
};

const EndGameModal: FC<TEndGameModal> = ({ closeModal, isOpen, text }) => {
    const keyDownHandler = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            window.location.reload();
        }
    };

    return (
        <Modal isOpen={isOpen} setOpen={closeModal} padding="32px">
            <StyledContainer>
                <StyledTitle>{text}</StyledTitle>
                <Button type="primary" size="large" autoFocus onKeyDown={keyDownHandler}>
                    Начать заново
                </Button>
            </StyledContainer>
        </Modal>
    );
};

export default EndGameModal;
