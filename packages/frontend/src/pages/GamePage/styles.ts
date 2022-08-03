import styled from 'styled-components';
import { colorPrimary } from 'styles/modules/colors';
import Desert from '../../assets/images/desert.png';

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid grey;
    border-top: 1px solid grey;
`;

export const StartScreenContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
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

export const GameBottom = styled.div`
    display: flex;
    height: calc(100vh - 735px);
    background-image: url(${Desert});
    background-size: cover;
    opacity: 0.3;
`;
