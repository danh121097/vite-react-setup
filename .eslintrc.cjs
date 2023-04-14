module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "unused-imports"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "no-useless-escape": "off",
        "unused-imports/no-unused-imports": "warn",
        'unused-imports/no-unused-imports-ts': "warn",
        "no-unused-vars": "off",
    }
}
