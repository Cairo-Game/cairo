module.exports = {
    preset: "ts-jest",
    "testEnvironment": "jsdom",
    "transform": {
        '^.+\\test.t[s|x]?$': 'ts-jest',
        'node_modules/^.+\\.ts?$': 'ts-jest',
        "^.+\\.css$": "jest-transform-css"
    },
    "transformIgnorePatterns": [
        "node_modules/(?!variables/.*)"
    ],
    "roots": [
        "<rootDir>"
    ],
    "moduleDirectories": [
        "node_modules", "src"
    ],
    globals: {
        'ts-jest': {
            diagnostics: {
                exclude: ['**'],
            },
        }
    }
};