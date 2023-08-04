module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  extends: ["airbnb"],
  plugins: ["react", "react-hooks", "@typescript-eslint"],
};
