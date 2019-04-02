module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 8, // 允许async
    ecmaFeatures: {
      experimentalObjectRestSpread: true // 允许...
    }
  },
  rules: {
    "linebreak-style": "off",
    indent: ["error", 2],
    "no-console": "off",
    quotes: ["error", "single"],
    semi: ["error", "never"]
  }
};
