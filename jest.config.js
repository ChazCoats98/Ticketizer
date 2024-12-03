module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom', 
    roots: ['<rootDir>'],
    testMatch: [
        '<rootDir>/src/**/*.spec.ts', 
        '<rootDir>/server/**/*.test.js', 
    ],
    transform: {
        '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 
    moduleFileExtensions: ['ts', 'js', 'html', 'json'],
    moduleNameMapper: {
        '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
        '\\.(html)$': '<rootDir>/_mocks_/htmlMock.js'
    },
};