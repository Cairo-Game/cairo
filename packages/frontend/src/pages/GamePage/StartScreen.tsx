import React, { useEffect, useState } from 'react';

import { useAppDispatch } from 'hooks/Redux';
import { fetchUserInfoData } from 'store/actions/UserActions';
import GamePage from './components/GamePage/GamePage';
import { Button, StartScreenContainer } from './styles';

export const StartScreen = () => {
    const dispatch = useAppDispatch();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        dispatch(fetchUserInfoData());
    }, []);

    if (!isReady) {
        return (
            <StartScreenContainer>
                <Button onClick={() => setIsReady(true)}>Начать игру!</Button>
            </StartScreenContainer>
        );
    }

    return <GamePage setIsReady={setIsReady} />;
};
