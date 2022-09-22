import React from 'react';
import { TRatingItem } from './RatingItem.types';
import { LeftSide, LevelLabel, LoginText, Place, RatingItemContainer, RightSide, ScoreLabel } from './styles';
import Shield from '../../../assets/svg/shield.svg';

export const RatingItem = ({ rating, place }: TRatingItem) => {
    const { avatar, name, level, score } = rating.data;

    return (
        <RatingItemContainer>
            <LeftSide>
                <Place>{place}</Place>
                {avatar ? <img src={avatar} /> : <Shield width="50" />}
                <LoginText>{name}</LoginText>
            </LeftSide>
            <RightSide>
                <LevelLabel>{level}</LevelLabel>
                <ScoreLabel>{score}</ScoreLabel>
            </RightSide>
        </RatingItemContainer>
    );
};
