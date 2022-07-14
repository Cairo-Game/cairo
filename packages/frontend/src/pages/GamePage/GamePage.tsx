import React, { useState, useEffect, useRef } from 'react';

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
let blockY = y - 50;

let jumpFLag = false;
let jumpCount = 0;
let jumpLength = 35;
let jumpHeight = 0;

let blocks: { x: number; y: number; width: number; height: number }[] = [];

let reqAnimaitonId: any = null;

const GamePage = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

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
        for (let i = 0; i < 20; i++) {
            const randomWidth = randomIntFromInterval(10, 50);
            const randomHeight = randomIntFromInterval(70, 120);
            const randomX = blockX + randomIntFromInterval(100, 200) * (i + 1);
            blocks.push({
                x: randomX,
                y: blockY,
                width: randomWidth,
                height: randomHeight,
            });
        }

        // blocks.sort((a, b) => +a.x - +b.x);

        // for (let i = 0; i < blocks.length; i++) {
        //     if (i > 0) {
        //         const prev = blocks[i - 1];
        //         const current = blocks[i];
        //         console.log('i ', i);

        //         console.log('prev ', prev);
        //         console.log('current ', current);

        //         if (current.x - (prev.x + prev.width) < 100) {
        //             current.x += prev.width + 100;
        //         }
        //     }
        // }
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

            if (
                x + ballRadius / 2 >= b.x &&
                x - ballRadius / 2 <= b.x + b.width &&
                y + ballRadius / 2 + jumpHeight < b.y + b.height
            ) {
                console.log('lose');
                x = 30;
                document.location.reload();
                cancelAnimationFrame(reqAnimaitonId);
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
            console.log('win');
            document.location.reload();
            cancelAnimationFrame(reqAnimaitonId);
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
        draw(ctx);
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

    return (
        <StyledContainer>
            <canvas ref={canvasRef} />
        </StyledContainer>
    );
};

export default GamePage;
