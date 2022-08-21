import axiosInstance from 'services/BaseService';

import { AppDispatch } from 'store/Store';
import { ratingSlice } from 'store/slices/RatingSlice';
import { TRating } from 'pages/Rating/Rating.types';

export const sendDataToLeaderboard = (data: TRating) => {
    return async (dispatch: AppDispatch) => {
        const key = 'addToLeaderboard';
        try {
            dispatch(ratingSlice.actions.fetching(key));
            const response = await axiosInstance.post('leaderboard', {
                ...data,
                ratingFieldName: 'score',
                teamName: 'cairo',
            });
            dispatch(ratingSlice.actions.fetchSuccess(key));
        } catch (e) {
            dispatch(ratingSlice.actions.fetchError({ key, errorMessage: e.response.data?.reason || e.message }));
        }
    };
};

export const getLeaderboard = () => {
    return async (dispatch: AppDispatch) => {
        const key = 'getLeaderboard';
        try {
            dispatch(ratingSlice.actions.fetching(key));
            const response = await axiosInstance
                .post('leaderboard/cairo', {
                    ratingFieldName: 'score',
                    cursor: 0,
                    limit: 5,
                })
                .then((response) => response?.data);
            dispatch(ratingSlice.actions.fetchLeaderboard({ key, data: response }));
            dispatch(ratingSlice.actions.fetchSuccess(key));
        } catch (e) {
            dispatch(ratingSlice.actions.fetchError({ key, errorMessage: e.response?.data?.reason || e.message }));
        }
    };
};
