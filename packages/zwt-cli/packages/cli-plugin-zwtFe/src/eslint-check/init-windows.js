const { fs, chalk, ora } = require('../../shared-utils');
const utils = require('../../utils');
const { log, execSilent } = utils;

// loading动效
const spinner = ora();

// 常量
const constVar = require('./const');
const PATH = constVar.path;
const SCRIPTS = constVar.scripts;
const STYLELINTSCRIPTS = constVar.stylelintScripts;

/*
* eslint: 校验并修复 html,js
* 1. 安装相关依赖: eslint, babel-eslint, eslint-plugin-vue, eslint-loader
* eslint-loader【可选】：仅用于热加载
* 2. 创建 .eslintrc.js 并写入
* 3. 创建 .eslintignore 并写入
* 4. package.json 写入 lint, lint:fix
* 5. webpack.dev.js 写入 eslint-loader
* ------------------
* stylelint: 校验并修复 [c,sa,sc,le]ss
* 1. 安装相关依赖: stylelint, stylelint-config-standard
* stylelint-webpack-plugin【可选】：仅用于热加载
* 2. 创建 .stylelintrc.js 并写入
* 3. 创建 .stylelintignore 并写入
* 4. package.json 写入 lint, lint:fix
* 5. webpack.dev.js 写入 eslint-loader
* ------------------
* husky: 添加git钩子
* 6. npx初始化husky并写入钩子函数: npx husky_init && npm install
* 7. 修改钩子函数 .husky/pre-commit
* 8.【可选】写入到PATH变量，sourcetree使用
* */
async function installWindows() {
    log('当前环境：windows');
    await installEslint();
    await installStylelint();
    await installHusky();
    await updateTipsEslintCheck();
}
async function installEslint() {
    console.log('开始安装 eslint');
    // 1. 安装依赖
    const versions = utils.getInitVersions(PATH.IN_VERSION, PATH);
    const commandStr = `npm install -D ${versions}`;
    await utils.npmInstall(commandStr, { async: true, silent: true });
    log('1执行完成: 安装eslint');

    // 2. 写入.eslintrc.js
    let finalPath = utils.getPathByVersion(PATH.IN_ESLINT, PATH);
    await utils.copyFile(finalPath, PATH.USE_ESLINT, true);
    log('2执行完成: 写入.eslintrc.js');

    /*
    * 3. 写入.eslintignore, 如果有node_modules则忽略node_modules
    * eslint会自动忽略 node_modules 和 .xxx文件 和 ./**.*.*文件, 除了 .eslintrc.*
    * https://eslint.org/docs/user-guide/configuring/ignoring-code
    * */
    execSilent(`echo #  插件目录 >> ${PATH.USE_ESLINTIGNORE}`);
    execSilent(`echo src/assets/**/*.js >> ${PATH.USE_ESLINTIGNORE}`);
    execSilent(`echo dist/ >> ${PATH.USE_ESLINTIGNORE}`);
    log('3执行完成: 写入.eslintignore');

    // 4.1 写入package.json: npm run eslint, npm run eslint:fix
    // 4.2 写入.gitignore: .eslintcache
    const scripts = [...SCRIPTS.values()];
    scripts.map(x => {
        utils.addScript(x.key, x.value);
    });
    execSilent(`echo .eslintcache >> ${PATH.USE_GITIGNORE}`);
    log('4执行完成: 写入package.json, .gitignore');
    spinner.succeed(chalk.green('eslint 安装成功'));

    // 5. todo: 写入webpack.dev.js
}
async function installStylelint() {
    console.log('开始安装 stylelint');
    // 1. 安装依赖
    const versions = utils.getInitVersions(PATH.IN_STYLELINT_VERSION);
    const commandStr = `npm install -D ${versions}`;
    await utils.npmInstall(commandStr, { async: true, silent: true });
    log('5执行完成: 安装stylelint');

    // 2. 写入.stylelintrc.js
    await utils.copyFile(PATH.IN_STYLELINTRC, PATH.USE_STYLELINTRC, true);
    log('6执行完成: 写入.stylelintrc.js');

    // 3. 写入.stylelintignore, 会自动忽略node_modules
    await utils.copyFile(PATH.IN_STYLELINTIGNORE, PATH.USE_STYLELINTIGNORE, true);
    log('7执行完成: 写入.stylelintignore');

    // 4.1 写入package.json: npm run lint, npm run lint:fix
    // 4.2 写入.gitignore: .stylelintcache
    const stylelintScripts = [...STYLELINTSCRIPTS.values()];
    stylelintScripts.map(x => {
        utils.addScript(x.key, x.value);
    });
    execSilent(`echo .stylelintcache >> ${PATH.USE_GITIGNORE}`);
    log('8执行完成: 写入package.json, .gitignore');
    spinner.succeed(chalk.green('stylelint 安装成功'));

    // 5. todo: 写入webpack.dev.js
}
async function installHusky() {
    console.log('开始安装 husky');
    // 1. 安装husky并重新npm install以添加husky pre-commit钩子
    const hasInstallHusky = utils.hasInstallHusky();
    if (!hasInstallHusky) {
        const commandStr = 'npx husky-init && npm install';
        await utils.npmInstall(commandStr, { async: true, silent: false });
    }
    log('9执行完成: 安装 huksy 并 npm install');

    // 2. 写入.husky/pre-commit钩子，如果有npm run lint则忽略
    let preCommitFile = fs.readFileSync(PATH.USE_PRECOMMIT, 'utf8');
    preCommitFile = preCommitFile.replace(/npm test\n/g, '');
    fs.writeFileSync(PATH.USE_PRECOMMIT, preCommitFile);
    if (!preCommitFile.includes('npm run lint')) {
        execSilent(`echo npm run lint >> ${PATH.USE_PRECOMMIT}`);
    }
    log('10执行完成: 写入 .husky/pre-commit钩子');

    /*
  * 3. 写入到path环境变量，sourceTree用
  * todo: exec默认为cmd.exe，cmd下 $xx无法获取环境变量
  * */
    // execSilent(`echo "export PATH=\\"$(dirname $(which node)):\\$PATH\\"" > ${PATH.USE_PATH_HUSKYRC_WINDOWS}`);
    // log('7执行完成: 写入到 path环境变量');
    console.log(chalk.green('husky 安装成功'));
}

// 3. 更新tips.md
async function updateTipsEslintCheck() {
    await utils.updateTips(PATH.USE_TIPS_MD, PATH.IN_TIPS_MD);
}

module.exports = {
    installWindows
};
