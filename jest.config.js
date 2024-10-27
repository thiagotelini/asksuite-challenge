/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ['<rootDir>/src', '<rootDir>/test'],
  collectCoverageFrom: ['<rootDir>/src/framework/services/**/*.ts', '<rootDir>/src/controller/**/*.ts', '<rootDir>/src/business/**/*.ts'],
  moduleNameMapper: {
    '#business/(.*)': '<rootDir>/src/business/$1',
    '#controller/(.*)': '<rootDir>/src/controller/$1',
    '#framework/(.*)': '<rootDir>/src/framework/$1',
    '#test/(.*)': '<rootDir>/test/$1',
  }
}