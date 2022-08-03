import React, {PropsWithChildren} from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import {AppStore, RootState, setupStore} from "store/Store";
import {PreloadedState} from "@reduxjs/toolkit";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: AppStore
}

export function renderWithStore(
    ui: React.ReactElement,
    {
        store = setupStore(),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}