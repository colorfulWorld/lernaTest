module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'globals': {
        '_': true,
        '$': true,
        'WadeMobile': true,
    },
    'extends': [
        'eslint:recommended',
        // 'plugin:vue/essential'
        'plugin:vue/strongly-recommended'
    ],
    'parser': 'vue-eslint-parser',
    'parserOptions': {
        'parser': 'babel-eslint',
        'ecmaVersion': 6,
        'sourceType': 'module'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-console': 'error',
        'no-debugger': 'error',
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': ['error', {
            'singleline': 4
        }],
        'object-curly-spacing': ['error', 'always', { 'objectsInObjects': false }], // 对象内两侧空格
        'keyword-spacing': ['error'], // 关键字(if, else, function 等)空格，默认两端true
        'space-before-function-paren': ['error', 'never'], // 函数名与参数之间空格fn()
        'space-before-blocks': ['error', 'always'], // 块之前空格 fn() {}
        'key-spacing': ['error'], // 对象冒号和value之间有空格
        'space-infix-ops': ['error'], // 中缀操作符+-*/%前后有空格
        'space-unary-ops': ['error'], // 一元操作符++,--,new,typeof等前后的空格
        'comma-spacing': ['error'], // 逗号前后空格
        'no-prototype-builtins': ['off'] // 允许使用 xxx.hasOwnProperty()方法
    }
};
