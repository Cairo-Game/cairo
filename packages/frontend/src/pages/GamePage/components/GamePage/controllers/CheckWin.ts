import { TCheckWin } from './types';

export const checkWin = ({ blocks, x, setWin }: TCheckWin) => {
    const lastBlock = blocks[blocks.length - 1];
    if (x > lastBlock.x + lastBlock.width + 50) {
        setWin(true);
    }
};
