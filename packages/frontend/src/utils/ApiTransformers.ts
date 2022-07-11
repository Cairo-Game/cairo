import {IUserProfileData} from "models/Api/User.api";
import {IUser} from "models/Entity/User";

export const transformUser = (data: IUserProfileData): IUser => {
    return {
        login: data.login,
        firstName: data.first_name,
        secondName: data.second_name,
        email: data.email,
        phone: data.phone,
        displayName: data.display_name,
        avatar: data.avatar,
        id: data.id,
    };
};