module.exports = {
    testEnvironment: 'node',
    verbose: false,
    testRegex: '.unit-spec.ts$',
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
};