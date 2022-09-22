import React, { useReducer } from 'react';
import { initialUserState, UserContext, userReducer } from '../context/UserContext';

export const UserProvider = (props: any) => {
    const [state, dispatch] = useReducer(userReducer, initialUserState);

    return <UserContext.Provider value={{ state: state, dispatch: dispatch }}>{props.children}</UserContext.Provider>;
};
