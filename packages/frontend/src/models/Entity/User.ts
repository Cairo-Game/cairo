export interface IUser {
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    password?: string;
    phone: string;
    avatar?: string;
    id?: number;
}

export class UserEntity {
    constructor(
        private _firstName: string,
        private _secondName: string,
        private _displayName: string,
        private _login: string,
        private _email: string,
        private _password: string,
        private _phone: string,
        private _avatar: string,
        private _id: string,
    ) {}

    get firstName() {
        return this._firstName;
    }

    get secondName() {
        return this._secondName;
    }

    get displayName() {
        return this._displayName;
    }

    get login() {
        return this._login;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get phone() {
        return this._phone;
    }

    get avatar() {
        return this._avatar;
    }

    get id() {
        return this._id;
    }

    static of(obj?: any) {
        return new UserEntity(
            obj?.firstName ?? '',
            obj?.secondName ?? '',
            obj?.displayName ?? '',
            obj?.login ?? '',
            obj?.email ?? '',
            obj?.password ?? '',
            obj?.phone ?? '',
            obj?.avatar ?? '',
            obj?.id ?? '',
        );
    }
}
