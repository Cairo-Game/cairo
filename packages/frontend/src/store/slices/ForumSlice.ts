import { createSlice } from '@reduxjs/toolkit';

export type TComment = {
    id: string;
    message: string;
    answers: string[];
};

export type TTopic = {
    id: string;
    title: string;
    message: string;
    comments: TComment[];
};

export interface IForumState {
    topicList: TTopic[];
    topic: TTopic | null;
}

const initialState = (): IForumState => ({
    topicList: [{ id: '1', message: 'Первое сообщение', title: 'Новая тема для обсуждения', comments: [] }],
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
        addComment(state, action: { payload: TComment }) {
            state.topic = { ...state.topic, comments: [...state.topic.comments, action.payload] };
            state.topicList = state.topicList.map((topic) => (topic.id === state.topic.id ? state.topic : topic));
        },
        removeTopic(state, action) {
            state.topicList = state.topicList.filter((topic) => topic.id !== action.payload);
        },
        addAnswerToComment(state, action: { payload: { id: string; answer: string } }) {
            state.topic = {
                ...state.topic,
                comments: state.topic.comments.map((comment) =>
                    comment.id === action.payload.id
                        ? { ...comment, answers: [...comment.answers, action.payload.answer] }
                        : comment,
                ),
            };
            state.topicList = state.topicList.map((topic) => (topic.id === state.topic.id ? state.topic : topic));
        },
    },
});

const { actions, reducer } = forumSlice;

export const { addTopic, setTopic, addComment, removeTopic, addAnswerToComment } = actions;

export default reducer;
