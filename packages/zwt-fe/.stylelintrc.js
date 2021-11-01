module.exports = {
    extends: ['stylelint-config-standard'],
    plugins: ['stylelint-scss'],
    rules: {
        'indentation': 4,
        'string-quotes': 'single',
        'color-hex-length': 'long',
        'no-empty-source': null,
        'selector-list-comma-newline-after': 'always-multi-line',
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true, // 使用stylelint-scss校验未知变量
        'declaration-no-important': true, // 禁止使用!important
        'font-family-no-missing-generic-family-keyword': null, // [临时]禁止在字体族名称列表中缺少通用字体族关键字
        'no-descending-specificity': null, // [临时]禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器。'
        /* scss规则 */
        'scss/dollar-variable-colon-space-after': 'always' // $定义变量冒号后需要空格
    }
};
