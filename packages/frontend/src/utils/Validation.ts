function checkNames(value: string) {
    return value.replace(/^[A-ZА-Я][a-zа-я-]+$/u, '').length > 0 ?
        'Некорректное значение' : '';
}

function checkLogin(value: string) {
    return value.replace(/^[a-zA-Z0-9-_]{3,20}$/, '').length > 0
        && value.replace(/^[0-9]$/, '').length > 0 ?
        'Недопустимые символы' : '';
}

function checkPassword(value: string) {
    return value.replace(/^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, '').length > 0 ? 
        'Выбранный пароль не удовлетворяет требованиям' : '';
}

function checkPhone(value: string) {
   return value.replace(/^(8|\+7|7)[\d+]{10,15}$/, '').length > 0 ?
         'Введен некорректный номер телефона' : ''
}

function checkEmail(value: string) {
   return value.replace(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, '')?.length > 0 ?
        'Некорректное значение': '';
}

export const Validation = (key: string, value: string) => {
    if (!value) {
        return 'Обязательное поле'
    }
    else if (key == 'second_name' || key == 'first_name') {
        return checkNames(value);
    } else if (key == 'login') {
        return checkLogin(value);
    } else if (key == 'phone') {
        return checkPhone(value);
    } else if (key == 'email') {
        return checkEmail(value);
    } else {
        return "";
    }
}
