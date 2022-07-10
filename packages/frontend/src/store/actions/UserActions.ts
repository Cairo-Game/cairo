import axios from "../../services/BaseService";
import {AppDispatch} from "../Store";
import {userSlice} from "../slices/UserSlice";
import {ILoginData, ISignUpData} from "models/Api/User.api";
import {history} from "utils/History";

export const fetchUserSignIn = (loginData: ILoginData) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.fetching())
            const response = await axios.get('auth/signin', {
                params: {...loginData}
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