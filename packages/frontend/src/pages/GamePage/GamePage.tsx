import React, { useState, useEffect, useRef } from 'react';

import { StyledContainer } from './styles';

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let x = 30;
let y = 140;

const ballRadius = 20;

let rightPressed = false;
let leftPressed = false;

let blockX = x + 400;
let blockY = y - 50;

let jumpFLag = false;
let jumpCount = 0;
let jumpLength = 35;
let jumpHeight = 0;

const blockWidth = 20;
const blockHeight = 100;
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

  for (let i = 0; i < 6; i++) {
    const distance = i <= 3 ? blockX * (i + 1) : (blockX * (i + 1)) / 2;
    blocks.push({
      x: distance,
      y: blockY,
      width: randomIntFromInterval(8, 30),
      height: randomIntFromInterval(70, 120),
    });
  }

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

  // const collisionDetection = () => {
  //   for (let i = 0; i < blocks.length; i++) {
  //     const b = blocks[i];

  //     if (
  //       x + ballRadius >= b.x &&
  //       x - ballRadius <= b.x + blockWidth &&
  //       y + ballRadius + jumpHeight < b.y + blockHeight
  //     ) {
  //       alert('lose');
  //       document.location.reload();
  //       cancelAnimationFrame(reqAnimaitonId);
  //     }
  //   }
  // };

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      drawBall(ctx);
      drowBlocks(ctx);
      // collisionDetection();

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

      if (jumpFLag) {
        jump();
      }

      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];

        if (
          x + ballRadius / 2 >= b.x &&
          x - ballRadius / 2 <= b.x + blockWidth &&
          y + ballRadius / 2 + jumpHeight < b.y + blockHeight
        ) {
          alert('lose');
          x = 30;
          document.location.reload();
          cancelAnimationFrame(reqAnimaitonId);
        }
      }

      reqAnimaitonId = requestAnimationFrame(() => draw(ctx));
    }
  };

  useEffect(() => {
    setCtx(canvasRef.current.getContext('2d'));
  }, [setCtx]);

  useEffect(() => {
    if (ctx) {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = 160;
    }
  }, [ctx]);

  useEffect(() => {
    draw(ctx);
  }, [ctx]);

  useEffect(() => {
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
