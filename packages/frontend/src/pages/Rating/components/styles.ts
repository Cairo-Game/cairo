import styled from 'styled-components';
import { colorBlackLighten } from '../../../styles/modules/colors';

export const RatingItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    border-radius: 15px;
    background-color: white;
    max-width: 600px;
    width: 600px;
`;

export const LeftSide = styled.div`
    display: flex;
    align-items: center;
    column-gap: 20px;
`;

export const RightSide = styled.div`
    display: flex;
    align-items: center;
    column-gap: 20px;
`;

export const Place = styled.div`
    border-radius: 50%;
    background-color: #fffdf8;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffaa00;
    font-size: 30px;
    border: 2px solid #ffe4af;
`;

export const LoginText = styled.div`
    color: ${colorBlackLighten};
    font-size: 20px;
    cursor: pointer;
`;

export const LevelLabel = styled.div`
    border-radius: 50%;
    background-color: #36b3ff;
    width: 50px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    box-sizing: border-box;
    font-size: 18px;
    border: 2px dotted #ffe4af;
`;

export const ScoreLabel = styled.div`
    font-size: 18px;
    padding: 3px 19px;
    background-color: #5a5a5a;
    border-radius: 45px;
    color: white;
`;
