const ReactTestRenderer = require('react-test-renderer');
import React from 'react';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

test('renders correctly', () => {
    // const tree = ReactTestRenderer.create(<SignUp/>)
    //     .toJSON();
    // expect(tree).toMatchSnapshot();
});
