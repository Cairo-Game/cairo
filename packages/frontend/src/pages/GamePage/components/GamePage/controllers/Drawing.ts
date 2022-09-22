import { TDrawCat, TDrawBlocks } from './types';

export const drawCat = ({ ctx, x, y, chapter, jumpHeight }: TDrawCat) => {
    if (ctx) {
        ctx.drawImage(chapter, x, y - jumpHeight - 15);
    }
};

export const drawBlocks = ({ ctx, blocks, sprite }: TDrawBlocks) => {
    if (ctx) {
        blocks.forEach((block) => {
            ctx.drawImage(sprite, block.x, block.y);
        });
    }
};
