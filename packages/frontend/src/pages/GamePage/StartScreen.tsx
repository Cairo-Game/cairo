import React, { useState } from 'react';
import GamePage from './components/GamePage/GamePage';
import { Button, StartScreenContainer } from './styles';

export const StartScreen = () => {
    const [isReady, setIsReady] = useState(false);

    if (!isReady) {
        return (
            <StartScreenContainer>
                <Button onClick={() => setIsReady(true)}>Начать игру!</Button>
            </StartScreenContainer>
        );
    }

    return <GamePage setIsReady={setIsReady} />;
};
