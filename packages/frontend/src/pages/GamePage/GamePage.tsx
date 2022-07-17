import React, { useState, useEffect, useRef } from 'react';

import EndGameModal from './components/EndGameModal/EndGameModal';
import { StyledContainer } from './styles';

const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const ballRadius = 20;

let x = 30;
let y = 300 - ballRadius;

let rightPressed = false;
let leftPressed = false;

let blockX = x + 100;
let blockY = y;

let jumpFLag = false;
let jumpCount = 0;
let jumpLength = 35;
let jumpHeight = 0;

let blocks: { x: number; y: number; width: number; height: number }[] = [];

let reqAnimaitonId: any = null;

const GamePage = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [win, setWin] = useState(false);
    const [lose, setLose] = useState(false);

    const keyDownHandler = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
            rightPressed = true;
        } else if (e.key === 'ArrowLeft') {
            leftPressed = true;
        } else if (e.key === 'ArrowUp') {
            jumpFLag = true;
        }
    };

    const keyUpHandler = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
            rightPressed = false;
        } else if (e.key === 'ArrowLeft') {
            leftPressed = false;
        }
    };

    const makeBlocks = () => {
        for (let i = 0; i < 10; i++) {
            const randomWidth = randomIntFromInterval(10, 30);

            const randomX = blockX + i * 200 + randomIntFromInterval(70, 220);
            const randomY = randomIntFromInterval(190, 250);
            const randomHeight = blockY - randomY + ballRadius;
            blocks.push({
                x: randomX,
                y: randomY,
                width: randomWidth,
                height: randomHeight,
            });
        }

        blocks.sort((a, b) => +a.x - +b.x);
    };

    const drawBall = (ctx: CanvasRenderingContext2D) => {
        if (ctx) {
            ctx.beginPath();
            ctx.arc(x, y - jumpHeight, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#0095DD';
            ctx.fill();
            ctx.closePath();
        }
    };

    const jump = () => {
        jumpCount++;
        jumpHeight = 4 * jumpLength * Math.sin((Math.PI * jumpCount) / jumpLength);

        if (jumpCount > jumpLength) {
            jumpHeight = 0;
            jumpFLag = false;
            jumpCount = 0;
        }
    };

    const drowBlocks = (ctx: CanvasRenderingContext2D) => {
        if (ctx) {
            blocks.forEach((block) => {
                ctx.beginPath();
                ctx.rect(block.x, block.y, block.width, block.height);
                ctx.fillStyle = '#0095DD';
                ctx.fill();
                ctx.closePath();
            });
        }
    };

    const collisionDetection = () => {
        for (let i = 0; i < blocks.length; i++) {
            const b = blocks[i];

            if (x + ballRadius / 2 >= b.x && x - ballRadius / 2 <= b.x + b.width && y - jumpHeight > b.y) {
                setLose(true);
                // x = 30;

                // document.location.reload();
                // cancelAnimationFrame(reqAnimaitonId);
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

            if (x + ballRadius > ctx.canvas.width) {
                x = ctx.canvas.width - ballRadius;
            }
        } else if (leftPressed) {
            x -= 4;
            if (x < 30) {
                x = 30;
            }
        }
    };

    const checkWin = () => {
        const lastBlock = blocks[blocks.length - 1];
        if (x > lastBlock.x + lastBlock.width + 50) {
            setWin(true);
            // document.location.reload();
            // cancelAnimationFrame(reqAnimaitonId);
        }
    };

    const draw = (ctx: CanvasRenderingContext2D) => {
        if (ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            drawBall(ctx);
            drowBlocks(ctx);

            if (jumpFLag) {
                jump();
            }

            ballMovement();
            collisionDetection();
            checkWin();

            reqAnimaitonId = requestAnimationFrame(() => draw(ctx));
        }
    };

    useEffect(() => {
        setCtx(canvasRef.current.getContext('2d'));
    }, [setCtx]);

    useEffect(() => {
        if (ctx) {
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = 300;
        }
    }, [ctx]);

    useEffect(() => {
        if (!win || !lose) {
            draw(ctx);
        }
    }, [ctx]);

    useEffect(() => {
        makeBlocks();
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        };
    }, []);

    useEffect(() => {
        if (win || lose) {
            cancelAnimationFrame(reqAnimaitonId);
            // setTimeout(() => {
            //     window.location.reload();
            // }, 3000);
        }
    }, [win, lose]);

    return (
        <StyledContainer>
            {win && <EndGameModal text="Вы победили! :-)" isOpen={win} closeModal={() => setWin(false)} />}
            {lose && <EndGameModal text="Вы проиграли :-(" isOpen={lose} closeModal={() => setLose(false)} />}
            <canvas ref={canvasRef} />
        </StyledContainer>
    );
};

export default GamePage;
