import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './slices/UserSlice';
import forumReducer from './slices/ForumSlice';

const RootReducer = combineReducers({
    user: userReducer,
    forum: forumReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: RootReducer,
    });
};

export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
