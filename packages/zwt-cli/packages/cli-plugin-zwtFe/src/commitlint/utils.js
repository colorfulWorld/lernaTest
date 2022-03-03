const { getNodeVersion } = require('../../utils');
const { chalk } = require('../../shared-utils');

/*
* 校验node版本，12以上才支持
* */
function checkNodeVersion(ver) {
    const version = getNodeVersion();
    if (version < ver) {
        checkFail();
        process.exit(1);
    }
}
function checkFail() {
    const tips =  `当前node版本过低，请使用node>=12版本，建议使用nvm或nvm-windows管理node版本;
nvm: https://github.com/nvm-sh/nvm;
nvm-windows: https://github.com/coreybutler/nvm-windows;`;
    console.log(chalk.red(tips));
}

module.exports = {
    checkNodeVersion
};
