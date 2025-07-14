/** @type {import("prettier").Options} */
export default {
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  semi: true,
  printWidth: 80,
  arrowParens: "avoid",
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@(core|shared|ui|api)?/((?!styles).)*$",
    "^(.?./)((?!.*.s?css$).+)$",
    "^[@(core|shared|ui|api)(./)](.)+styles(.+).s?css$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [],
  organizeImportsSkipDestructiveCodeActions: true,
};
