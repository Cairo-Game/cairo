export interface IGamePage {
    setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TBlock = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type TCoord = {
    x: number;
    y: number;
};
