import styled from 'styled-components';
import { colorPrimary } from 'styles/modules/colors';

export const StyledContainer = styled.div`
    display: flex;
    border-bottom: 1px solid grey;
    border-top: 1px solid grey;
`;

export const StartScreenContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 30px;
    background-color: ${colorPrimary};
    color: white;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
`;
