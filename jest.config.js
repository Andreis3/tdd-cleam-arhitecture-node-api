module.exports = {
    roots: ['<rootDir>'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],

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
    preset: '@shelf/jest-mongodb',
};
