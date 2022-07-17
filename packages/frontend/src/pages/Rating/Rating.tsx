import React from 'react';
import { RatingItem } from './components/RatingItem';
import { TRating } from './Rating.types';
import { Container } from './styles';

export const Rating = () => {
    const rating: TRating[] = [
        {
            id: '1',
            place: 1,
            user: {
                firstName: 'Игорь',
                secondName: 'Лобода',
                displayName: 'russiancmo',
                login: 'russiancmo',
                email: 'russiancmo@gmail.com',
                password: '124235',
                phone: '+79101235310',
                avatar: '',
                id: 1,
            },
            level: 10,
            score: 50000,
        },
        {
            id: '2',
            place: 2,
            user: {
                firstName: 'Игорь',
                secondName: 'Лобода',
                displayName: 'russiancmo',
                login: 'russiancmo',
                email: 'russiancmo@gmail.com',
                password: '124235',
                phone: '+79101235310',
                avatar: '',
                id: 1,
            },
            level: 10,
            score: 50000,
        },
        {
            id: '3',
            place: 3,
            user: {
                firstName: 'Игорь',
                secondName: 'Лобода',
                displayName: 'russiancmo',
                login: 'russiancmo',
                email: 'russiancmo@gmail.com',
                password: '124235',
                phone: '+79101235310',
                avatar: '',
                id: 1,
            },
            level: 10,
            score: 50000,
        },
        {
            id: '4',
            place: 4,
            user: {
                firstName: 'Игорь',
                secondName: 'Лобода',
                displayName: 'russiancmo',
                login: 'russiancmo',
                email: 'russiancmo@gmail.com',
                password: '124235',
                phone: '+79101235310',
                avatar: '',
                id: 1,
            },
            level: 10,
            score: 50000,
        },
        {
            id: '5',
            place: 5,
            user: {
                firstName: 'Игорь',
                secondName: 'Лобода',
                displayName: 'russiancmo',
                login: 'russiancmo',
                email: 'russiancmo@gmail.com',
                password: '124235',
                phone: '+79101235310',
                avatar: '',
                id: 1,
            },
            level: 10,
            score: 50000,
        },
    ];

    return (
        <Container>
            {rating.map((item) => (
                <RatingItem key={item.id} rating={item} />
            ))}
        </Container>
    );
};
