module.exports = {
  extends: ["prettier"],
  plugins: ["prettier", "react"],
  ecmaFeatures: {
    jsx: true,
    modules: true
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: "babel-eslint",
  rules: {
    "no-undef": "error",
    "no-var": "error",
    "no-unused-vars": "error",
    "prefer-const": "error",
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2
  }
};
