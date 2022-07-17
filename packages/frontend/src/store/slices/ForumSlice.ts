import { createSlice } from '@reduxjs/toolkit';

export type TTopic = {
    id: string;
    title: string;
    message: string;
};

export interface IForumState {
    topicList: TTopic[];
    topic: TTopic | null;
}

const initialState = (): IForumState => ({
    topicList: [],
    topic: null,
});

export const forumSlice = createSlice({
    name: 'forum',
    initialState: initialState(),
    reducers: {
        addTopic(state, action) {
            state.topicList = [...state.topicList, action.payload];
        },
        setTopic(state, action) {
            state.topic = state.topicList.find(({ id }) => id === action.payload);
        },
    },
});

const { actions, reducer } = forumSlice;

export const { addTopic, setTopic } = actions;

export default reducer;
