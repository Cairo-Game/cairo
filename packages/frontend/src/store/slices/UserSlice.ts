import {IUser} from "models/Entity/User";
import {createSlice} from "@reduxjs/toolkit";
import {EStatusLoading, IRequestDataState} from "models/Api/common";
import {transformUser} from "utils/ApiTransformers";
import {IUserProfileUpdateData} from "models/Api/User.api";


export interface UserState {
    userInfo: Partial<IUser>,
    requestData: Partial<{
        signInData: IRequestDataState<any>
        userInfoData: IRequestDataState<Partial<IUserProfileUpdateData>>
        logoutData: IRequestDataState<any>
        signUpData: IRequestDataState<any>
        updateProfileData: IRequestDataState<any>
    }>|null
}

const initialState = () : UserState => ({
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
        signInData: {} as IRequestDataState<any>,
        userInfoData: {} as IRequestDataState<Partial<IUserProfileUpdateData>>,
        logoutData: {} as IRequestDataState<any>,
        signUpData: {} as IRequestDataState<any>,
        updateProfileData: {} as IRequestDataState<any>
    }
})

export const userSlice = createSlice(
    {
        name:"user",
        initialState: initialState(),
        reducers: {
            fetching(state, action){
                console.log('action:',action)
                const key = action.payload;
                state.requestData[key].status=EStatusLoading.IN_PROGRESS
            },
            fetchSuccess(state, action){
                state.requestData[action.payload].status=EStatusLoading.SUCCESS
            },
            fetchError(state, action){
               state.requestData[action.payload.key].errorMessage=action.payload.errorMessage
              state.requestData[action.payload.key].status=EStatusLoading.ERROR
            },
            fetchUserData(state, action){
                state.requestData[action.payload.key].data=action.payload.data
                state.userInfo=transformUser(action.payload.data);
            },
            fetchUpdateUserData(state, action){
                state.requestData[action.payload.key].data=action.payload.data
                state.userInfo=transformUser(action.payload.data);
            },
            dropRequestDataState(state){
                state.requestData=initialState().requestData
            },
            dropState(state){
                state = initialState()
            },
        }
    }
)

export default userSlice.reducer;