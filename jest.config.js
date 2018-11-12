module.exports = {
  "testURL": "http://localhost:7357/jest/unit",
  "roots": [
    "<rootDir>/unit-tests",
  ],
  "moduleNameMapper": {
    "^.+\\.(css|scss)$": "<rootDir>unit-tests/stubJestCSS.js"
  },
  "moduleFileExtensions": [
    "js",
    "vue"
  ],
  "transform": {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest"
  },
  "transformIgnorePatterns": [
    "node_modules[\/](?!(officient-vue-components)[\/]).*"
  ],
  "clearMocks": true,
  "globals": {
    "go": true,
    "Toast": true
  },
  "coverageReporters": [
    "text"
  ],
  "collectCoverageFrom": [
    "client/src/**/*.{js,vue}"
  ],
}
