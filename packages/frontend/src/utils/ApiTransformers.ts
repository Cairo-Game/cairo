import { IUserProfileData } from 'models/Api/User.api';
import { IUser } from 'models/Entity/User';

export const transformUser = (data: IUserProfileData): IUser => {
    const mapedData: IUserProfileData = Object.fromEntries(
        Object.entries(data).map(([key, value]: [keyof IUserProfileData, any]): [keyof IUserProfileData, any][] =>
            !value ? [key, ''] : [key, value],
        ),
    );

    const { login, first_name, second_name, email, phone, display_name, avatar, id } = mapedData;

    return {
        login,
        firstName: first_name,
        secondName: second_name,
        email: email,
        phone: phone,
        displayName: display_name,
        avatar: avatar,
        id: id,
    };
};
