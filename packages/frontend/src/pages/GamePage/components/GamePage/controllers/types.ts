import { TBlock } from '../GamePage.types';

export type TDrawCat = {
    ctx: CanvasRenderingContext2D;
    chapter: HTMLImageElement;
    catWidth: number;
    catHeight: number;
    x: number;
    y: number;
    jumpHeight: number;
};

export type TDrawBlocks = {
    ctx: CanvasRenderingContext2D;
    sprite: HTMLImageElement;
    blocks: TBlock[];
};

export type TDrawing = {
    ctx: CanvasRenderingContext2D;
    blocks: TBlock[];
    chapter: HTMLImageElement;
    catWidth: number;
    catHeight: number;
    x: number;
    y: number;
    jumpHeight: number;
};

export type TCollisionDetection = {
    blocks: TBlock[];
    x: number;
    y: number;
    catRadius: number;
    jumpHeight: number;
    setLose: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TCheckWin = {
    blocks: TBlock[];
    x: number;
    setWin: React.Dispatch<React.SetStateAction<boolean>>;
};
