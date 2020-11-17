module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
  "standard-with-typescript",
  "plugin:@typescript-eslint/recommended",
  "prettier/@typescript-eslint",
  "plugin:prettier/recommended"
],
plugins: ['prettier'],
globals: {
  Atomics: 'readonly',
  SharedArrayBuffer: 'readonly',
},
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-new": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/return-await": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/comma-spacing": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/interface-name-prefix": ["error", {"prefixWithI": "always"}]
    //"@typescript-eslint/explicit-function-return-type": "off"
  },
}
