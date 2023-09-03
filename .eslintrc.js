module.exports = {
  extends: ["react-app", "react-app/jest", "prettier", "plugin:react/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "warn",
    "no-unused-vars": "warn",
    "use-at-your-own-risk": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",

    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "off",
    // "array-callback-return": "off",
    // "no-lone-blocks": "off",
    // "jsx-a11y/anchor-is-valid": "off",
    // "eqeqeq": "off",
    // "import/no-anonymous-default-export": "off",
    // "@typescript-eslint/no-unused-vars": "off",
  },
};
