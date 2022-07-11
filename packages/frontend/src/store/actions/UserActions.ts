import axios from "services/BaseService";
import {AppDispatch} from "store/Store";
import {userSlice} from "store/slices/UserSlice";
import {ILoginData, ISignUpData, IUserProfileUpdateData} from "models/Api/User.api";
import {transformUser} from "utils/ApiTransformers";

export const fetchUserSignIn = (loginData: ILoginData) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.fetching())
            const response = await axios.post('auth/signin', {
                ...loginData
            })
            dispatch(userSlice.actions.fetchSuccess())
        }
        catch (e){
            dispatch(userSlice.actions.fetchError(e as Error))
        }
    }
}

export const fetchUserSignUp = (signUpData: ISignUpData) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.fetching())
            const response = await axios.post('auth/signup', {
                ...signUpData
            })
            dispatch(userSlice.actions.fetchSuccess())
            // history.replace("/profile-descriptions");
        }
        catch (e){
            dispatch(userSlice.actions.fetchError(e as Error))
        }
    }
}

export const fetchUserData = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.fetching())
            const response = await axios.get('auth/user')
                .then(response => transformUser(response.data));
            dispatch(userSlice.actions.fetchUserData(response));
            dispatch(userSlice.actions.fetchSuccess());
        }
        catch (e){
            dispatch(userSlice.actions.fetchError(e.response.data?.reason||e.message))
        }
    }
}

export const fetchUpdateUserProfile = (data: IUserProfileUpdateData) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.fetching())
            const response = await axios.put('user/profile', {
                ...data
            }).then(response => transformUser(response.data));
            dispatch(userSlice.actions.fetchUserData(response));
            dispatch(userSlice.actions.fetchSuccess());
        }
        catch (e){
            dispatch(userSlice.actions.fetchError(e.response.data?.reason||e.message))
        }
    }
}

export const dropRequestUserDataState = () => {
    return (dispatch: AppDispatch) => {
        dispatch(userSlice.actions.dropRequestUserDataState)
    }
}

export const fetchUserLogout = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.fetching())
            const response = await axios.post('auth/logout')
            dispatch(userSlice.actions.fetchSuccess());
            dispatch(userSlice.actions.dropState)
        }
        catch (e){
            dispatch(userSlice.actions.fetchError(e.response.data?.reason||e.message))
        }
    }
}