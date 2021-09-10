const { resolve } = require('path');

/*
* 文件路径：IN: 开发所在路径，USE: 使用所在路径
* 文件夹名称来源：templates.json中multiVersions.value, 用于区分版本
* */
const PATH = {
    IN_ESLINT: resolve(__dirname, './0/eslintrc.js'),
    IN_ESLINT_1: resolve(__dirname, './1/eslintrc.js'),
    USE_ESLINT: './.eslintrc.js',
    IN_ESLINTIGNORE: resolve(__dirname, './eslintignore'), // 暂无
    USE_ESLINTIGNORE: './.eslintignore',
    IN_VERSION: resolve(__dirname, './0/version.json'),
    IN_VERSION_1: resolve(__dirname, './1/version.json'),
    USE_PRECOMMIT: './.husky/pre-commit',
    USE_PATH_HUSKYRC_MAC: '~/.huskyrc',
    USE_PATH_HUSKYRC_WINDOWS: '~/.huskyrc',
    IN_TIPS_MD: resolve(__dirname, './tips.md'),
    USE_TIPS_MD: './tips.md'
};

// package.json中Scripts
const SCRIPTS = new Map([
    ['lint', { key: 'lint', value: './node_modules/.bin/eslint --ext .js,.vue ./'}],
    ['lintFix', { key: 'lint:fix', value: './node_modules/.bin/eslint --fix --ext .js,.vue ./' }]
]);

module.exports = {
    path: PATH,
    scripts: SCRIPTS
};

