/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/src",
    "<rootDir>/src/__tests__",
  ],

  // A map from regular expressions to paths to transformers
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
};
