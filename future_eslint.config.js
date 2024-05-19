import reactrefresh from "eslint-plugin-react-refresh";
import typescriptParser from "@typescript-eslint/parser";
import globals from "globals";
import typescripteslint from "@typescript-eslint/eslint-plugin";
import {configs as reacthooksConfigs} from "eslint-plugin-react-hooks";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  typescripteslint.configs.recommended,
  reacthooksConfigs.recommended,
  {
    files: ["**/*.ts, **/*.tsx"],
    plugins: {
      "react-refresh": reactrefresh,
    },
    ignores: ['dist', '.eslintrc.cjs'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2024,
      globals: globals.browser
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {allowConstantExport: true},
      ],
    }
  }
];
