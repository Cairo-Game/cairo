import styled from 'styled-components';

export type TStyledModalWindow = {
    isOpen: boolean;
    padding?: string;
};

export const StyledModal = styled.div<{ isOpen: boolean }>`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    background-color: rgb(0 0 0 / 40%);
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
    transition: all 0.3s ease-in-out;
    z-index: ${({ isOpen }) => (isOpen ? 100 : 0)};
    overflow: auto;
`;

export const StyledModalWindow = styled.div<TStyledModalWindow>`
    padding: ${({ padding = 0 }) => padding};
    background-color: white;
    transform: ${({ isOpen }) => (isOpen ? 'scale(1)' : 'scale(0.5)')};
    transition: all 0.5s ease-in-out;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
