export let jumpFLag = false;
export let jumpCount = 0;
export let jumpLength = 60;
export let jumpHeight = 0;
export let rightPressed = false;
export let leftPressed = false;

export const keyDownHandler = (
    e: KeyboardEvent,
    setLeftPressed: React.Dispatch<React.SetStateAction<boolean>>,
    setRightPressed: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    if (e.key === 'ArrowRight') {
        setRightPressed(true);
        rightPressed = true;
    } else if (e.key === 'ArrowLeft') {
        setLeftPressed(true);
        leftPressed = true;
    } else if (e.key === 'ArrowUp') {
        jumpFLag = true;
    }
};

export const keyUpHandler = (
    e: KeyboardEvent,
    setLeftPressed: React.Dispatch<React.SetStateAction<boolean>>,
    setRightPressed: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    if (e.key === 'ArrowRight') {
        setRightPressed(false);
        rightPressed = false;
    } else if (e.key === 'ArrowLeft') {
        setLeftPressed(false);
        leftPressed = false;
    }
};

export const jump = () => {
    jumpCount++;
    jumpHeight = 4 * jumpLength * Math.sin((Math.PI * jumpCount) / jumpLength);

    if (jumpCount > jumpLength) {
        jumpHeight = 0;
        jumpFLag = false;
        jumpCount = 0;
    }
};
