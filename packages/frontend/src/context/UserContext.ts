import React, { createContext } from 'react';

export const initialUserState = { id: null };

export const UserContext = createContext(null);

export const userReducer = (state, action) => {
    return { id: action.id };
};
