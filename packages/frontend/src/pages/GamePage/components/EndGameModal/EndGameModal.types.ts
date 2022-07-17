export type TEndGameModal = {
    isOpen: boolean;
    closeModal: () => void;
    text: string;
    setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
};
