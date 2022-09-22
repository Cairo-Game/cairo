import React, { createContext } from 'react';
import { ThemeVariants } from '../enums/theme';

export const initialThemeState = { darkMode: false };

export const ThemeContext = createContext(null);

export const themeReducer = (state, action) => {
    switch (action.type) {
        case ThemeVariants.LIGHTMODE:
            return { darkMode: false };
        case ThemeVariants.DARKMODE:
            return { darkMode: true };
        default:
            return state;
    }
};
