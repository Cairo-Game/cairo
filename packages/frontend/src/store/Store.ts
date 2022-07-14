import { configureStore } from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import userReducer from "./slices/UserSlice";

const RootReducer = combineReducers({
    user: userReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: RootReducer,
    })
}

export type RootState = ReturnType<typeof RootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']