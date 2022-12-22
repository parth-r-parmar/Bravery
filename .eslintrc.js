module.exports = {
  extends: ["react-app", "prettier", "plugin:react/recommended"],
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "warn",
    "no-unused-vars": "warn",
    "use-at-your-own-risk": "off",

    // "react/prop-types": "off",
    // "array-callback-return": "off",
    // "no-lone-blocks": "off",
    // "jsx-a11y/anchor-is-valid": "off",
    // "eqeqeq": "off",
    // "import/no-anonymous-default-export": "off",
    // "@typescript-eslint/no-unused-vars": "off",
    // "react-hooks/exhaustive-deps": "off",
  },
};
