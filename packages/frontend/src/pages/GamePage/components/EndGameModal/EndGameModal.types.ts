export type TEndGameModal = {
    isOpen: boolean;
    isWin: boolean;
    closeModal: () => void;
    text: string;
    setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
};
