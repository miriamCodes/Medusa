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
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
  },
};
