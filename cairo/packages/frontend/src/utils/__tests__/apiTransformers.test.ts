import { transformUser } from '../../utils/ApiTransformers';

describe('transformUser', () => {
    it('should return object with keys of a camelCase format', () => {
        const data = {
            id: 1,
            first_name: 'John',
            second_name: 'Doe',
            display_name: 'New User',
            login: 'Login',
            password: '1234Azx',
            avatar: '',
            email: 'test@mail.ru',
            phone: '89101231212',
        };

        const result = {
            id: 1,
            firstName: 'John',
            secondName: 'Doe',
            displayName: 'New User',
            login: 'Login',
            avatar: '',
            email: 'test@mail.ru',
            phone: '89101231212',
        };

        expect(transformUser(data)).toEqual(result);
    });

    it('should return object with empty displayName and login fields when they are null', () => {
        const data = {
            id: 1,
            first_name: 'John',
            second_name: 'Doe',
            display_name: null,
            login: null,
            password: '1234Azx',
            avatar: '',
            email: 'test@mail.ru',
            phone: '89101231212',
        };
        const result2 = {
            id: 1,
            firstName: 'John',
            secondName: 'Doe',
            displayName: '',
            login: '',
            avatar: '',
            email: 'test@mail.ru',
            phone: '89101231212',
        };
        expect(transformUser(data)).toEqual(result2);
    });
});
