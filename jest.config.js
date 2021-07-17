module.exports = {
    roots: ['<rootDir>'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/main/**',
        '!<rootDir>/src/data/use-cases/add-account/DbAccountProtocols.ts',
        '!<rootDir>/src/data/use-cases/authentication/DbAuthenticationProtocols.ts',
        '!<rootDir>/src/presentation/controllers/login/LoginControllerProtocols.ts',
        '!<rootDir>/src/presentation/controllers/signup/SignupControllerProtocols.ts',
        '!<rootDir>/src/presentation/middleware/AuthMiddlewareProtocols.ts',
        '!<rootDir>/src/presentation/controllers/login/signup/SignupControllerProtocols.ts',
        '!<rootDir>/src/presentation/controllers/login/login/LoginControllerProtocols.ts',
    ],

    // The directory where Jest should output its coverage files
    coverageDirectory: 'tests/coverage',

    // Indicates which provider should be used to instrument code for coverage
    // coverageProvider: 'v8',

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // A map from regular expressions to paths to transformers
    transform: {
        '.+\\.ts$': 'ts-jest',
    },
    // testMatch: ['**/tests/**/*.spec.ts'],

    modulePathIgnorePatterns: [
        '<rootDir>/src/presentation/protocols/index.ts',
        '<rootDir>/src/presentation/controllers/signup/signupProtocols.ts',
    ],
    watchPathIgnorePatterns: ['globalConfig'],
    preset: '@shelf/jest-mongodb',
};
