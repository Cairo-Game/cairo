import { createSlice } from '@reduxjs/toolkit';

import { EStatusLoading, IRequestDataState } from '../../packages/frontend/src/models/Api/common';
import { TRating } from '../../packages/frontend/src/pages/Rating/Rating.types';

export interface RatingState {
    ratingData: TRating[];
    requestData: {
        addToLeaderboard: IRequestDataState;
        getLeaderboard: IRequestDataState<TRating[]>;
    };
}

const initialState: RatingState = {
    ratingData: [],
    requestData: {
        addToLeaderboard: {} as IRequestDataState,
        getLeaderboard: {} as IRequestDataState<TRating[]>,
    },
};

export const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {
        fetching(state, { payload }) {
            state.requestData[payload].status = EStatusLoading.IN_PROGRESS;
        },
        fetchSuccess(state, { payload }) {
            state.requestData[payload].status = EStatusLoading.SUCCESS;
        },
        fetchError(state, { payload: { key, errorMessage } }) {
            state.requestData[key].errorMessage = errorMessage;
            state.requestData[key].status = EStatusLoading.ERROR;
        },
        fetchLeaderboard(state, { payload: { key, data } }) {
            state.requestData[key].data = data;
            state.ratingData = data;
        },
    },
});

export default ratingSlice.reducer;
