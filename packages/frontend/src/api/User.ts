import axios, { AxiosResponse } from 'axios';

export type CreateUserProps = {
    firstName: string;
    secondName: string;
    login: string;
    email: string;
    phone: string;
    avatar?: string;
    id?: number;
};

export type GetUserProps = {
    firstName: string;
    secondName: string;
    login: string;
    email: string;
    phone: string;
    avatar?: string;
    id?: number;
};

export const CreateUser = (props: CreateUserProps) => {
    axios.post('v1/user', props);
};

export const GetUser = (login: string): Promise<AxiosResponse<GetUserProps, any>> => {
    return axios.get('v1/user/', { params: { login } });
};
