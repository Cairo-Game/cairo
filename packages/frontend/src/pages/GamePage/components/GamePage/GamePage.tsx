import React, { useState, useEffect, useRef } from 'react';

import EndGameModal from '../EndGameModal/EndGameModal';
import { GameBottom, StyledContainer, StyledCanvas, StyledFullScreenButton } from '../../styles';
import { IGamePage, TBlock } from './GamePage.types';
import {
    jump,
    jumpFLag,
    jumpHeight,
    keyDownHandler,
    keyUpHandler,
    leftPressed,
    rightPressed,
} from './controllers/Actions';
import { randomIntFromInterval } from '../../../../functions/randomIntFromInterval';
import { collisionDetection } from './controllers/CheckLose';
import { checkWin } from './controllers/CheckWin';
import CatStay from '../../../../assets/images/sprites/cat-run-1.png';
import CatRun from '../../../../assets/images/sprites/cat-run-2.png';
import Bush1 from '../../../../assets/images/sprites/bush-1.png';
import { drawBlocks, drawCat } from './controllers/Drawing';

//config
const maxLevel = 2;
const catRadius = 35;
const catWidth = 70;
const catHeight = 52;
const gameHeight = 600;
const startLivesCount = 3;
let x = 30;
let y = gameHeight - catRadius;
let blocks: TBlock[] = [];
let reqAnimationId: any = null;
//

const GamePage = ({ setIsReady }: IGamePage) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [win, setWin] = useState(false);
    const [lose, setLose] = useState(false);
    const [lvl, setLvl] = useState(1);
    const [lives, setLives] = useState(startLivesCount);
    const [isFullScreen, setIsFullScreen] = useState(true);

    const [leftPressedState, setLeftPressed] = useState(false);
    const [rightPressedState, setRightPressed] = useState(false);

    const catSprites = { catStay: CatStay, catRun: CatRun };

    const [chapter, setChapter] = useState(new Image());
    const [spritesBlocks, setSpritesBlocks] = useState(new Image());

    const makeFirstLvl = () => {
        let blockX = x + 100;
        const blockWidth = 80;
        const blockHeight = 150;

        blocks = [];
        for (let i = 0; i < 10; i++) {
            const randomX = blockX + i * 400 + randomIntFromInterval(70, 320);
            blocks.push({
                x: randomX,
                y: gameHeight - blockHeight,
                width: blockWidth,
                height: blockHeight,
            });
        }

        blocks.sort((a, b) => +a.x - +b.x);
    };

    const makeSecondLvl = () => {
        let blockX = x + 100;
        const blockWidth = 80;
        const blockHeight = 150;

        blocks = [];
        for (let i = 0; i < 10; i++) {
            const randomX = blockX + i * 200 + randomIntFromInterval(70, 220);
            blocks.push({
                x: randomX,
                y: gameHeight - blockHeight,
                width: blockWidth,
                height: blockHeight,
            });
        }

        blocks.sort((a, b) => +a.x - +b.x);
    };

    const makeBlocks = (lvl) => {
        switch (lvl) {
            case 1: {
                makeFirstLvl();
                break;
            }
            case 2: {
                makeSecondLvl();
                break;
            }
        }
    };

    const ballMovement = () => {
        if (rightPressed) {
            if (x > 400) {
                blocks = blocks.map((block) => ({
                    x: block.x - 4,
                    y: block.y,
                    width: block.width,
                    height: block.height,
                }));
            } else {
                x += 4;
            }

            if (x + catRadius > ctx.canvas.width) {
                x = ctx.canvas.width - catRadius;
            }
        } else if (leftPressed) {
            x -= 4;
            if (x < 30) {
                x = 30;
            }
        }
    };

    const draw = (ctx: CanvasRenderingContext2D) => {
        if (ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            drawCat({ ctx, x, y, chapter, jumpHeight, catWidth, catHeight });
            drawBlocks({ ctx, blocks, sprite: spritesBlocks });

            if (jumpFLag) {
                jump();
            }

            ballMovement();
            collisionDetection({ x, y, jumpHeight, catRadius, setLose, blocks });
            checkWin({ blocks, x, setWin });

            reqAnimationId = requestAnimationFrame(() => draw(ctx));
        }
    };

    useEffect(() => {
        setCtx(canvasRef.current.getContext('2d'));
    }, [setCtx]);

    useEffect(() => {
        if (lvl === 1) {
            setSpritesBlocks((prevState) => {
                prevState.src = Bush1;
                return prevState;
            });
        }
    }, [lvl]);

    useEffect(() => {
        if (ctx) {
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = 600;
        }
    }, [ctx]);

    useEffect(() => {
        if (leftPressedState || rightPressedState) {
            setChapter((prevState) => {
                prevState.src = catSprites.catRun;
                return prevState;
            });
        } else {
            setChapter((prevState) => {
                prevState.src = catSprites.catStay;
                return prevState;
            });
        }
    }, [leftPressedState, rightPressedState]);

    useEffect(() => {
        if (!win && !lose) {
            draw(ctx);
        }
    }, [ctx, win, lose]);

    useEffect(() => {
        makeBlocks(lvl);
        document.addEventListener('keydown', (e) => keyDownHandler(e, setLeftPressed, setRightPressed));
        document.addEventListener('keyup', (e) => keyUpHandler(e, setLeftPressed, setRightPressed));

        return () => {
            document.removeEventListener('keydown', (e) => keyDownHandler(e, setLeftPressed, setRightPressed));
            document.removeEventListener('keyup', (e) => keyUpHandler(e, setLeftPressed, setRightPressed));
        };
    }, []);

    useEffect(() => {
        if (win) {
            cancelAnimationFrame(reqAnimationId);
            x = 30;
            setLvl((currentState) => {
                if (maxLevel !== currentState) {
                    return currentState + 1;
                }
                return currentState;
            });
            if (maxLevel !== lvl) {
                makeBlocks(lvl + 1);
            } else {
                makeBlocks(lvl);
            }
        } else if (lose) {
            cancelAnimationFrame(reqAnimationId);
            x = 30;
            setLvl(1);
            makeBlocks(1);
        }
    }, [win, lose]);

    const toggleFullScreen = () => {
        setIsFullScreen(!!document.fullscreenElement);
        const body = document.body;

        if (!document.fullscreenElement) {
            body.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    return (
        <StyledContainer>
            {win && (
                <EndGameModal
                    text="Вы победили! :-)"
                    isOpen={win}
                    isWin={win}
                    closeModal={() => setWin(false)}
                    setIsReady={setIsReady}
                />
            )}
            {lose && (
                <EndGameModal
                    text="Вы проиграли :-("
                    isOpen={lose}
                    isWin={win}
                    closeModal={() => setLose(false)}
                    setIsReady={setIsReady}
                />
            )}
            <StyledCanvas ref={canvasRef} />
            <GameBottom />
            <StyledFullScreenButton type="button" onClick={toggleFullScreen}>
                {isFullScreen ? 'Полноэкранный режим' : 'Выйти из полноэкранного режима'}
            </StyledFullScreenButton>
        </StyledContainer>
    );
};

export default GamePage;
