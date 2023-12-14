{/*
 * INTEL CONFIDENTIAL
 * Copyright (C) 2023 Intel Corporation
 * This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
 * This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.
*/}

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:mdx/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', 'simple-import-sort', 'prettier'],
    settings: {
        'mdx/code-blocks': true,
        react: {
            createClass: 'createReactClass', // Regex for Component Factory to use,
            // default to "createReactClass"
            pragma: 'React', // Pragma to use, default to "React"
            fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
            version: 'detect', // React version. "detect" automatically picks the version you have installed.
        },
    },
    rules: {
        'prettier/prettier': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/no-unescaped-entities': 'off', //'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'no-use-before-define': 'off',
        'no-extra-boolean-cast': 'warn',
        'no-dupe-else-if': 'warn',
        'no-case-declarations': 'off', //'warn',
        'react/jsx-key': 'warn',
        'no-prototype-builtins': 'warn',
        'react/display-name': 'warn',
        'react/prop-types': 0,
        '@typescript-eslint/no-use-before-define': 'off',
        'no-unused-vars': 'off', //'warn',
        'react/jsx-pascal-case': [
            1,
            {
                allowNamespace: true,
            },
        ],
        'simple-import-sort/exports': 'warn',
        'simple-import-sort/imports': 'warn',
    },
    overrides: [
        {
            files: ['**/*.stories.*'],
            rules: {
                'import/no-anonymous-default-export': 'off',
            },
        },
    ],
};
