/** @type {import('ts-jest'/dist/types).InitialOptionsTsJest} */
module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.spec.(ts|js)"],
  testEnvironment: "node",
};
