import React, { FC } from 'react';
import { StyledModal, StyledModalWindow, TStyledModalWindow } from './styles';

type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
};

const Modal: FC<ModalProps & TStyledModalWindow> = ({ children, isOpen, setOpen, ...rest }) => (
    <StyledModal isOpen={isOpen} onClick={() => setOpen(false)}>
        <StyledModalWindow isOpen={isOpen} onClick={(e) => e.stopPropagation()} {...rest}>
            {isOpen && children}
        </StyledModalWindow>
    </StyledModal>
);
export default Modal;
