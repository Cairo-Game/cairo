import { TCollisionDetection } from './types';

export const collisionDetection = ({ blocks, x, y, catRadius, jumpHeight, setLose }: TCollisionDetection) => {
    for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];

        if (x + catRadius * 2 - 30 >= b.x && x <= b.x + b.width - 30 && y - jumpHeight > b.y) {
            setLose(true);
        }
    }
};
