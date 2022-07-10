import {IUser} from "models/Entity/User";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    userInfo: Partial<IUser>,
    requestData: {
        isLoading: boolean|null,
        errorMessage: string|null
    }
}

const initialState: UserState = {
    userInfo: {
        firstName: "",
        secondName: "",
        login: "",
        email: "",
        password: "",
        phone: ""
    },
    requestData: {
        isLoading: null,
        errorMessage: null
    }

}

export const userSlice = createSlice(
    {
        name:"user",
        initialState,
        reducers: {
            fetching(state){
                state.requestData.isLoading=null
            },
            fetchSuccess(state, action: PayloadAction){
                state.requestData.isLoading=true
            },
            fetchError(state, action){
              state.requestData.errorMessage=action.payload.response?.data?.reason||action.payload.message
              state.requestData.isLoading=false
            },
            fetchUserData(state, action){
              // state.userInfo
            },
        }
    }
)

export default userSlice.reducer;