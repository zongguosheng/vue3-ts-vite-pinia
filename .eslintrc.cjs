/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier"
  ],
  "env": {
    "vue/setup-compiler-macros": true,
    "browser": true, // browser global variables
    "es2021": true, // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
    "node": true,
  },
  "overrides": [
    {
      "files": [
        "cypress/integration/**.spec.{js,ts,jsx,tsx}"
      ],
      "extends": [
        "plugin:cypress/recommended"
      ]
    }
  ],
  "rules": {
    "semi": ['error', 'never'],
    "quotes": ['error', 'single']
  }
}
