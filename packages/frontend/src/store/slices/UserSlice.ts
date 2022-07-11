import {IUser} from "models/Entity/User";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {dropRequestUserDataState} from "store/actions/UserActions";

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
        phone: "",
        id: null,
        displayName: ""
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
                console.log('action:',action)
              state.requestData.errorMessage=action.payload
              state.requestData.isLoading=false
            },
            fetchUserData(state, action){
                state.userInfo=action.payload;
            },
            dropRequestUserDataState(state){
                state.requestData.isLoading=false
                state.requestData.errorMessage=""
            },
            dropState(state){
                state = {...initialState}
            },
        }
    }
)

export default userSlice.reducer;