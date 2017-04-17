module.exports = wallaby => ({
    files: [
        'src/**/*.ts',
        'spec/**/*.ts',
        '!src/**/*.spec.ts'
    ],
    tests: [
        'src/**/*.spec.ts',
        'spec/**/*.spec.ts'
    ],
    env: {
        type: 'node'
    },
    testFramework: 'jest',
    debug: true
});
