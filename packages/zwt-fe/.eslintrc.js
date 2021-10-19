module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        // 'plugin:vue/essential'
        'plugin:vue/strongly-recommended'
    ],
    'parser': 'vue-eslint-parser',
    'parserOptions': {
        'parser': 'babel-eslint',
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        // 'no-console': 'error', // nodejs需要用console向用户展示信息
        'no-debugger': 'error',
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': ['error', {
            'singleline': 4
        }]
    }
};
