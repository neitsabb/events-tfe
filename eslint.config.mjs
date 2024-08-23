import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended'
    )
  ),
  {
    languageOptions: {
      ecmaVersion: 2021, // Mise à jour de la version ECMAScript pour supporter les fonctionnalités modernes
      sourceType: 'module',
    },
  },
  {
    ignores: [
      'node_modules',
      'vendor',
      'tailwind.config.js',
      'resources/js/Components/ui/*.{js,jsx,ts,tsx}',
      'public/*',
    ],
  },

  {
    files: ['resources/js/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      react: fixupPluginRules(reactPlugin),
    },
    languageOptions: {
      parser: tsParser, // Utilisation du parser TypeScript pour les fichiers .ts et .tsx
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Désactiver cette règle pour React 17+
      '@typescript-eslint/no-unused-vars': ['error'], // Activer l'erreur pour les variables non utilisées
      'react/prop-types': 'off', // Désactiver la vérification des prop-types, puisque TypeScript est utilisé
    },
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off', // Désactiver cette règle
      'react/no-unescaped-entities': 'off', // Désactiver cette règle
    },
  },
];
