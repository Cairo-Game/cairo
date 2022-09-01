import React from 'react';
import { TRatingItem } from './RatingItem.types';
import { LeftSide, LevelLabel, LoginText, Place, RatingItemContainer, RightSide, ScoreLabel } from './styles';
import Shield from '../../../assets/svg/shield.svg';

export const RatingItem = ({ rating }: TRatingItem) => {
    return (
        <RatingItemContainer>
            <LeftSide>
                <Place>{rating.place}</Place>
                <Shield />
                <LoginText>{rating.user.login}</LoginText>
            </LeftSide>
            <RightSide>
                <LevelLabel>{rating.level}</LevelLabel>
                <ScoreLabel>{rating.score}</ScoreLabel>
            </RightSide>
        </RatingItemContainer>
    );
};
