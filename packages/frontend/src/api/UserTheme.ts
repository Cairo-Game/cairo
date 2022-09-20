import axios, { AxiosResponse } from 'axios';

export type TUserTheme = {
    theme: string;
    ownerId: string;
    themeId: string;
    device: string;
};

export const getUserTheme = async (id?: number): Promise<AxiosResponse<TUserTheme, any>> => {
    return await axios.get('v1/user-theme', { params: { id } });
};

export const createUserTheme = async (props: TUserTheme): Promise<AxiosResponse<TUserTheme, any>> => {
    return await axios.post('v1/user-theme', props);
};
