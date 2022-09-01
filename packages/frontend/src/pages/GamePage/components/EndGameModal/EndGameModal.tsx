import React, { FC } from 'react';
import { Button } from 'antd';

import Modal from '../../../../components/Layouts/Modal';
import { StyledContainer, StyledTitle } from './styles';
import { TEndGameModal } from './EndGameModal.types';

const EndGameModal: FC<TEndGameModal> = ({ closeModal, isOpen, isWin, text, setIsReady }) => {
    const keyDownHandler = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            // window.location.reload();
            closeModal();
        }
    };

    return (
        <Modal isOpen={isOpen} setOpen={closeModal} padding="32px">
            <StyledContainer>
                <StyledTitle>{text}</StyledTitle>
                <Button
                    type="primary"
                    size="large"
                    autoFocus
                    onKeyDown={keyDownHandler}
                    onClick={() => {
                        setIsReady(true);
                        closeModal();
                        // window.location.reload();
                    }}
                >
                    {isWin ? 'Следующий уровень' : 'Начать заново'}
                </Button>
            </StyledContainer>
        </Modal>
    );
};

export default EndGameModal;
