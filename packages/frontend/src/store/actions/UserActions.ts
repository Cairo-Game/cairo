import axios from "services/BaseService";
import {AppDispatch} from "store/Store";
import {userSlice} from "store/slices/UserSlice";
import {ILoginData, IPasswordForm, ISignUpData, IUserProfileUpdateData} from "models/Api/User.api";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile} from "antd/es/upload";

/**
 * Авторизация пользователя
 *
 * @param loginData Логин/пароль пользователя
 */
export const fetchUserSignIn = (loginData: ILoginData) => {
    return async (dispatch: AppDispatch) => {
        const key = 'signInData';
        try {
            dispatch(userSlice.actions.fetching(key))
            const response = await axios.post('auth/signin', {
                ...loginData
            })
            dispatch(userSlice.actions.fetchSuccess(key))
        }
        catch (e){
            dispatch(userSlice.actions.fetchError({key, errorMessage: e.response.data?.reason||e.message}))
        }
    }
}

/**
 * Регистрация нового пользователя
 *
 * @param signUpData Объект с атрибутами нового пользователя
 */
export const fetchUserSignUp = (signUpData: ISignUpData) => {
    return async (dispatch: AppDispatch) => {
        const key = 'signUpData';
        try {
            dispatch(userSlice.actions.fetching(key))
            const response = await axios.post('auth/signup', {
                ...signUpData
            })
            dispatch(userSlice.actions.fetchSuccess(key))
        }
        catch (e){
            dispatch(userSlice.actions.fetchError({key, errorMessage: e.response.data?.reason||e.message}))
        }
    }
}

/**
 * Получение информации о текущем пользователе
 */
export const fetchUserInfoData = () => {
    return async (dispatch: AppDispatch) => {
        const key = 'userInfoData';
        try {
            dispatch(userSlice.actions.fetching(key))
            const response = await axios.get('auth/user')
                .then(response => response?.data);
            dispatch(userSlice.actions.fetchUserData({key, data: response}));
            dispatch(userSlice.actions.fetchSuccess(key));
        }
        catch (e){
            dispatch(userSlice.actions.fetchError({key, errorMessage: e.response?.data?.reason||e.message}))
        }
    }
}

/**
 * Обновление настроек профиля
 *
 * @param data Объект с атрибутами пользователя
 */
export const fetchUpdateUserProfile = (data: IUserProfileUpdateData) => {
    return async (dispatch: AppDispatch) => {
        const key = 'updateProfileData'
        try {
            dispatch(userSlice.actions.fetching(key))
            const response = await axios.put('user/profile', {
                ...data
            }).then(response => response?.data);
            dispatch(userSlice.actions.fetchUserData({key, data: response}));
            dispatch(userSlice.actions.fetchSuccess(key));
        }
        catch (e){
            dispatch(userSlice.actions.fetchError({key, errorMessage: e.response?.data?.reason||e.message}))
        }
    }
}


/**
 * Обновление настроек пароля
 *
 * @param data Объект с настройками пароля
 */
export const fetchUpdateUserPassword = (data: IPasswordForm) => {
    return async (dispatch: AppDispatch) => {
        const key = 'updateProfilePassword'
        const {oldPassword, newPassword} = data;
        try {
            dispatch(userSlice.actions.fetching(key))
            const response = await axios.put('user/password', {
                oldPassword, newPassword
            }).then(response => response?.data);
            dispatch(userSlice.actions.fetchSuccess(key));
        }
        catch (e){
            dispatch(userSlice.actions.fetchError({key, errorMessage: e.response?.data?.reason||e.message}))
        }
    }
}


/**
 * Обновление аватара
 *
 * @param data Объект с настройками пароля
 */
export const fetchUpdateUserAvatar = (avatar: RcFile) => {
    return async (dispatch: AppDispatch) => {
        const key = 'updateProfileAvatar'
        try {
            dispatch(userSlice.actions.fetching(key))
            const formData = new FormData();
            formData.append('avatar', avatar);
            const response = await axios.put('user/profile/avatar',  formData,{
                headers: { "Content-Type": "multipart/form-data" },
            }).then(response => response?.data);
            dispatch(userSlice.actions.fetchSuccess(key));
        }
        catch (e){
            dispatch(userSlice.actions.fetchError({key, errorMessage: e.response?.data?.reason||e.message}))
        }
    }
}

/**
 * Сброс состояния результата выполнения запросов
 *
 */
export const dropRequestUserDataState = () => {
    return (dispatch: AppDispatch) => {
        dispatch(userSlice.actions.dropRequestDataState())
    }
}

/**
 * Выход из системы (разлогинивание)
 */
export const fetchUserLogout = (redirectCallback: () => void) => {
    return async (dispatch: AppDispatch) => {
        const key = 'logoutData'
        try {
            dispatch(userSlice.actions.fetching(key))
            const response = await axios.post('auth/logout')
            dispatch(userSlice.actions.fetchSuccess(key));
            await dispatch(userSlice.actions.dropUserState())
            redirectCallback()
        }
        catch (e){
            dispatch(userSlice.actions.fetchError({key, errorMessage: e.response.data?.reason||e.message}))
        }
    }
}