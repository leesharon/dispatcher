module.exports = {
    'env': {
        'browser': true,
        'react-native/react-native': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'overrides': [
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'plugins': [
        'react',
        'react-native',
        '@typescript-eslint'
    ],
    'rules': {
        'quotes': [
            'error',
            'single'
        ],
        'linebreak-style': ['error', 'unix'],
        'indent': ['error', 4],
        'semi': [
            'error',
            'never'
        ],
        'react-native/no-unused-styles': 2,
        'react-native/split-platform-components': 2,
        'react-native/no-inline-styles': 1,
        'react-native/no-single-element-style-arrays': 2,
        'react-native/no-color-literals': 1,
        // 'react-native/no-unsafe-optional-chain': 2,
        '@typescript-eslint/no-unused-vars': ['error'],
    }
}
