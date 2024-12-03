// jest.config.js

export default {
    coverageProvider: "v8",
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
    testEnvironment: "node",
    globals: {
        'babel-jest': {
            useESM: true,
        },
    },
};
