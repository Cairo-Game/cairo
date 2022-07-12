import axios from "services/BaseService";
import {AppDispatch} from "store/Store";
import {userSlice} from "store/slices/UserSlice";
import {ILoginData, ISignUpData, IUserProfileUpdateData} from "models/Api/User.api";

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

export const fetchUpdateUserProfile = (data: IUserProfileUpdateData) => {
    return async (dispatch: AppDispatch) => {
        const key = 'updateProfileData'
        try {
            dispatch(userSlice.actions.fetching(key))
            const response = await axios.put('user/profile', {
                ...data
            }).then(response => response.data);
            dispatch(userSlice.actions.fetchUserData(response));
            dispatch(userSlice.actions.fetchSuccess(key));
        }
        catch (e){
            dispatch(userSlice.actions.fetchError({key, errorMessage: e.response.data?.reason||e.message}))
        }
    }
}

export const dropRequestUserDataState = () => {
    return (dispatch: AppDispatch) => {
        dispatch(userSlice.actions.dropRequestDataState())
    }
}

export const fetchUserLogout = () => {
    return async (dispatch: AppDispatch) => {
        const key = 'logoutData'
        try {
            dispatch(userSlice.actions.fetching(key))
            const response = await axios.post('auth/logout')
            dispatch(userSlice.actions.fetchSuccess(key));
            dispatch(userSlice.actions.dropState())
        }
        catch (e){
            dispatch(userSlice.actions.fetchError({key, errorMessage: e.response.data?.reason||e.message}))
        }
    }
}