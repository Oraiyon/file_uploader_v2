import globals, { browser } from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import rules from "eslint-plugin-react/lib/rules";
import reactInJsxScope from "eslint-plugin-react/lib/rules/react-in-jsx-scope";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      reactInJsxScope: "off"
    },
    env: {
      browser: true,
      es2021: true,
      jest: true
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"]
  }
];
