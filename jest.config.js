// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],

  // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
  // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
  // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
  // For example:

  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '^@/.src/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/.src/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/.src/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/.src/pages/(.*)$': '<rootDir>/src/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '<rootDir>/src/**/*.tsx',
    '!<rootDir>/src/components/storyBook/**',
    '!<rootDir>/src/pages/story-book/**',
    '!<rootDir>/src/**/*.types.ts',
    '!<rootDir>/src/**/*.module.ts',
    '!<rootDir>/src/**/*.mock.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/*.test.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/types/*.ts',
    '!<rootDir>/src/styles/*.ts',
    // Exclude configuration files
    '!<rootDir>/src/utils/config.ts',
    '!<rootDir>/src/locales/resources.ts',
    // Exclude middleware due to Next.js testing complexity
    '!<rootDir>/src/middleware.ts',
    // Exclude Guards due to testing complexity with mocks
    '!<rootDir>/src/components/Guards/*.tsx',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/jest.*',
    '<rootDir>/src/__tests__',
    '<rootDir>/node_modules/',
    '<rootDir>/.github',
    '<rootDir>/.next',
    '<rootDir>/temp-repo/',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/temp-repo/',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['lcov', 'html', 'json', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
