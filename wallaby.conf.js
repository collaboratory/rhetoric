module.exports = function(wallaby) {
  /* eslint-disable no-path-concat */
  return {
    files: [
      "packages/*/*/package.json",
      "packages/*/*/src/**/*.+(js|jsx)",
      "!packages/*/*/src/**/*.+(test|spec).js?(x)"
    ],
    tests: ["packages/*/*/src/**/*.+(test|spec).js?(x)"],
    env: {
      type: "node",
      runner: "node"
    },
    testFramework: "jest",
    setup: w => {
      wallaby.testFramework.configure({
        setupFiles: [w.localProjectDir + "jest.setup.js"],
        snapshotSerializers: ["enzyme-to-json/serializer"],
        moduleNameMapper: {
          "^@collaboratory/craft-client-(.+)":
            w.localProjectDir + "packages/client/$1",
          "^@collaboratory/craft-server-(.+)":
            w.localProjectDir + "packages/server/$1",
          "^@collaboratory/(.+)": w.localProjectDir + "packages/common/$1"
        }
      });
    },
    compilers: {
      "**/*.js?(x)": wallaby.compilers.babel({
        presets: ["env", "react"],
        plugins: [
          "transform-class-properties",
          "transform-object-rest-spread",
          "transform-export-extensions",
          "transform-runtime",
          "transform-react-jsx"
        ]
      })
    }
  };
};
