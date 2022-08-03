import styled from 'styled-components';

import { colorPrimary } from 'styles/modules/colors';
import Desert from '../../assets/images/desert.png';

export const StyledContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ffdd9e;
    border-top: 1px solid #ffdd9e;
`;

export const StyledCanvas = styled.canvas`
    margin-top: 0px;
`;

export const StyledFullScreenButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    margin: 0;
    padding: 8px 24px;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0 0 2px rgb(0 0 0 / 40%);
    background-color: ${colorPrimary};
    color: white;
    border: none;
    cursor: pointer;
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
