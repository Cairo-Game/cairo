import React, { useReducer } from 'react';
import { initialThemeState, themeReducer, ThemeContext } from '../context/ThemeContext';

export const ThemeProvider = (props: any) => {
    const [state, dispatch] = useReducer(themeReducer, initialThemeState);

    return <ThemeContext.Provider value={{ state: state, dispatch: dispatch }}>{props.children}</ThemeContext.Provider>;
};
