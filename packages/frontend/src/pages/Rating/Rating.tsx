import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/Redux';
import { getLeaderboard } from '../../store/actions/RatingActions';
import { RatingItem } from './components/RatingItem';
import { Container } from './styles';

export const Rating = () => {
    const dispatch = useAppDispatch();
    const { ratingData } = useAppSelector((state) => state.rating);

    useEffect(() => {
        dispatch(getLeaderboard());
    }, []);
    console.log('ratingData ', ratingData);

    return (
        <Container>
            {ratingData.map((item, index) => (
                <RatingItem key={item.data.id} rating={item} place={index + 1} />
            ))}
        </Container>
    );
};
