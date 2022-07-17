export interface IGamePage {
    setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Block {
    x: number;
    y: number;
    width: number;
    height: number;
}
