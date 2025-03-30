// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["@typescript-eslint", "no-relative-import-paths", "eslint-plugin-unused-imports", "prettier"],
  ignorePatterns: ["/dist/*", "/node_modules/*", "/.expo/*"],
  parser: "@typescript-eslint/parser",
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "separate-type-imports" },
    ],
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { allowSameFolder: true, rootDir: ".", prefix: "@" },
    ],
    "unused-imports/no-unused-imports": "error",
  },
};