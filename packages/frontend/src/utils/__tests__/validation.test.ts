import { Validation } from '../../utils/Validation';

describe('Validation', () => {
    it('should return Некорректное значение', () => {
        const value = '123';

        expect(Validation('first_name', value)).toEqual('Некорректное значение');
    });

    it('should return empty string', () => {
        const value = 'Name';

        expect(Validation('first_name', value)).toEqual('');
    });

    it('should return Недопустимые символы', () => {
        const value = 'qu';

        expect(Validation('login', value)).toEqual('Недопустимые символы');
    });

    it('should return empty string', () => {
        const value = 'abc12345';

        expect(Validation('login', value)).toEqual('');
    });

    it('should return Введен некорректный номер телефона', () => {
        const value = 'a12345';

        expect(Validation('phone', value)).toEqual('Введен некорректный номер телефона');
    });

    it('should return Введен некорректный номер телефона', () => {
        const value = '9101234567';

        expect(Validation('phone', value)).toEqual('Введен некорректный номер телефона');
    });

    it('should return empty string', () => {
        const value = '89101234567';

        expect(Validation('phone', value)).toEqual('');
    });

    it('should return Некорректное значение', () => {
        const value = '@test.mail.ru';

        expect(Validation('email', value)).toEqual('Некорректное значение');
    });

    it('should return empty string', () => {
        const value = 'test@mail.ru';

        expect(Validation('email', value)).toEqual('');
    });
});
