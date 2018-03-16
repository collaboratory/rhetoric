const path = require("path");
module.exports = wallaby => {
  process.env.NODE_PATH +=
    path.delimiter + path.join(wallaby.projectCacheDir, "packages");
  /* eslint-disable no-path-concat */
  return {
    files: [
      {
        pattern: "packages/**"
      },
      {
        pattern: "**/node_modules/**",
        ignore: true
      },
      {
        pattern: "**/dist/**",
        ignore: true
      },
      {
        pattern: "packages/**/*.test.js",
        ignore: true
      }
    ],
    tests: [
      {
        pattern: "packages/**/src/**/*.test.js"
      },
      {
        pattern: "**/node_modules/**",
        ignore: true
      }
    ],
    compilers: {
      "**/*.js?(x)": wallaby.compilers.babel()
    },
    loose: true,
    delay: {
      run: 1000
    },
    env: {
      type: "node",
      runner: "node"
    },
    testFramework: "jest",
    filesWithNoCoverageCalculated: ["**/node_modules/**"],
    debug: true,
    reportConsoleErrorAsError: true
  };
};
