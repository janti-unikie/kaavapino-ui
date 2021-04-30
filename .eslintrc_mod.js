module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    settings: {
        react: {
          createClass: "createReactClass",
          pragma: "React",
          version: "15.0",
          flowVersion: "0.53",
        },
        propWrapperFunctions: ["forbidExtraProps"],
      },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "single"],
        semi: ["error", "never"],
        eqeqeq: "error",
        "no-trailing-spaces": "error",
        "arrow-spacing": ["error", { before: true, after: true }],
        "object-curly-spacing": ["error", "always"],
        "arrow-spacing": ["error", { before: true, after: true }],
        "no-console": 0,
        "react/prop-types": 0,
        "react/jsx-wrap-multilines": [
          "error",
          {
            declaration: "parens-new-line",
            assignment: "parens-new-line",
            return: "parens-new-line",
            arrow: "parens-new-line",
            condition: "parens-new-line",
            logical: "parens-new-line",
            prop: "parens-new-line",
          },
        ],
        "no-multiple-empty-lines": ["error", { max: 1 }],
        "comma-dangle": ["error", "never"],
    },
    globals: {
        process: true,
        module: true
      },
};
