import axios from 'axios';
export type TThemeCreateProps = {
    title: string;
    description: string;
};

export const CreateTheme = ({ title, description }: TThemeCreateProps) => {
    axios.post('v1/theme', { title, description });
};
