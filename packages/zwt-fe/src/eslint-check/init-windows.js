const { fs, chalk, ora } = require('../../shared-utils');
const utils = require('../../utils');
const { log, execSilent } = utils;

// loading动效
const spinner = ora();

// 常量
const constVar = require('./const');
const PATH = constVar.path;
const SCRIPTS = constVar.scripts;

/*
* 1. 安装相关依赖: eslint, babel-eslint, eslint-plugin-vue, eslint-loader
* eslint-loader【可选】：仅用于热加载
* 2. 创建 .eslint.js 并写入
* 3. 创建 .eslintignore 并写入
* 4. package.json 写入 lint, lint:fix
* 5. webpack.dev.js 写入 eslint-loader
* ------------------
* 6. npx初始化husky并写入钩子函数: npx husky_init && npm install
* 7. 修改钩子函数 .husky/pre-commit
* 8.【可选】写入到PATH变量，sourcetree使用
* */
async function installWindows() {
    log('当前环境：windows');
    await installEslint();
    await installHusky();
    await updateTipsEslintCheck();
}
async function installEslint() {
    console.log('开始安装 eslint');
    // 1. 安装依赖
    const versions = utils.getInitVersions(PATH.IN_VERSION);
    const commandStr = `npm install -D ${versions}`;
    await utils.npmInstall(commandStr, { async: true, silent: true });
    log('1执行完成: 安装eslint');

    // 2. 写入.eslintrc.js
    const eslintJs = fs.readFileSync(PATH.IN_ESLINT, 'utf8');
    fs.outputFileSync(PATH.USE_ESLINT, eslintJs);
    log('2执行完成: 写入.eslintrc.js');

    // 3. 写入.eslintignore, 如果有node_modules则忽略node_modules
    execSilent(`echo #  插件目录 >> ${PATH.USE_ESLINTIGNORE}`);
    execSilent(`echo src/assets/**/*.js >> ${PATH.USE_ESLINTIGNORE}`);
    const eslintIgnoreFile = fs.readFileSync(PATH.USE_ESLINTIGNORE, 'utf8');
    if (!eslintIgnoreFile.includes('node_modules')) {
        execSilent(`echo node_modules >> ${PATH.USE_ESLINTIGNORE}`);
    }
    log('3执行完成: 写入.eslintignore');

    // 4. 写入package.json: npm run eslint, npm run eslint:fix
    const scripts = [...SCRIPTS.values()];
    scripts.map(x => {
        utils.addScript(x.key, x.value);
    });
    log('4执行完成: 写入package.json');
    spinner.succeed(chalk.green('eslint 安装成功'));

    // 5. todo: 写入webpack.dev.js
}
async function installHusky() {
    console.log('开始安装 husky');
    // 1. 安装husky并重新npm install以添加husky pre-commit钩子
    const commandStr = 'npx husky-init && npm install';
    await utils.npmInstall(commandStr, { async: true, silent: true });
    log('5执行完成: 安装 huksy 并 npm install');

    // 2. 写入.husky/pre-commit钩子，如果有npm run lint则忽略
    let preCommitFile = fs.readFileSync(PATH.USE_PRECOMMIT, 'utf8');
    preCommitFile = preCommitFile.replace(/npm test\n/g, '');
    fs.writeFileSync(PATH.USE_PRECOMMIT, preCommitFile);
    if (!preCommitFile.includes('npm run lint')) {
        execSilent(`echo npm run lint >> ${PATH.USE_PRECOMMIT}`);
    }
    log('6执行完成: 写入 .husky/pre-commit钩子');

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
