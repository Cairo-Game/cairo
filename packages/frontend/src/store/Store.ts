import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './slices/UserSlice';
import forumReducer from './slices/ForumSlice';
import ratingRducer from '../../../../store/slices/RatingSlice';

const RootReducer = combineReducers({
    user: userReducer,
    forum: forumReducer,
    rating: ratingRducer,
});

export const setupStore = (state?: any) => {
    console.log(state ?? '');
    return configureStore({
        reducer: RootReducer,
    });
};

export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
