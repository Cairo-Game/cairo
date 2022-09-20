export interface ILoginData {
    login: string;
    password: string;
}

export interface ISignUpData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface IUserProfileUpdateData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface IUserProfileData extends IUserProfileUpdateData {
    id: number;
    password: string;
    avatar: string;
}

export interface IPasswordForm {
    oldPassword: string;
    newPassword: string;
    newPasswordRepeat: string;
}

export enum EPasswordFields {
    oldPassword = 'Старый пароль',
    newPassword = 'Новый пароль',
    newPasswordRepeat = 'Повторите пароль',
}
