module.exports = {
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.js$": "babel-jest",
    },
    transformIgnorePatterns: [
      "node_modules/(?!(axios)/)",
    ],
    testEnvironment: "node",
};