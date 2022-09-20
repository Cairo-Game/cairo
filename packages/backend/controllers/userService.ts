import { User } from '../models/user.model';
import { BaseRESTService } from './baseRestService';

interface FindRequest {
    id?: number;
}

interface FindNyLoginRequest {
    login?: string;
}

interface CreateRequest {
    firstName: string;
    secondName: string;
    login: string;
    email: string;
    phone: string;
    avatar?: string;
}

export class UserService implements BaseRESTService {
    static find = ({ id }: FindRequest) => {
        if (id) {
            return User.findByPk(id);
        } else {
            return undefined;
        }
    };

    static findUser = ({ login }: FindNyLoginRequest) => {
        if (login) {
            return User.findOne({ where: { login } });
        } else {
            return undefined;
        }
    };

    static create = async (data: CreateRequest) => {
        const foundUser = await User.findOne({ where: { login: data.login } });
        if (foundUser) {
            return 'user already exist';
        }
        return await User.create({
            firstName: data.firstName,
            secondName: data.secondName,
            login: data.login,
            phone: data.phone,
            email: data.email,
            avatar: data.avatar ?? null,
        });
    };
}
