const { fs, shell, chalk, ora } = require('../../shared-utils');
const {
  log,
  getInitVersions,
  npmInstall,
  showEnv,
  addScript,
  updateTips
} = require('../../utils');

// loading动效
const spinner = ora();

// 常量
const constVar = require('./const');
const PATH = constVar.path;
const SCRIPTS = constVar.scripts;


/*
* commitlint: 提交代码前校验commit message
* 1. 安装相关依赖: @commitlint/cli, @commitlint/config-conventional
* 2. 创建 commitlint.config.js 并写入
* 3.【可选】安装 husky, 已安装可忽略: npx husky-init && npm install
* 4. 添加 husky.commit-msg 钩子:
*    npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
* 5.【可选】测试 commitlint 是否安装成功: echo "foo" | ./node_modules/.bin/commitlint
*
* ------------------
* git-cz: 工作流方式填写commit message
* 1. PS: 安装后使用 'git cz' / 'git-cz', 不要使用 'cz'
* 2.【全局】安装依赖: commitizen, git-cz
* 3. 初始化 git-cz(会在package.json中添加config): commitizen init git-cz -D -E --force
* 4. 创建 changelog.config.js 并写入
*
* ------------------
* change log: 一键生成更新日志
* 1. 安装相关依赖: conventional-changelog-cli
* 2. package.json 写入 changelog, changelog:All
* */

async function installMac() {
  log('当前环境：mac');
  await installCommitlint();
  await installGitCZ();
  await installChangeLog();
  await updateTipsCommitlint();
}

// 1. 安装 comminlint
async function installCommitlint() {
  console.log('开始安装 commitlint');
  // 1. 安装依赖
  const versions = getInitVersions(PATH.IN_VERSION_COMMITLINT);
  const commandStr = `npm install -D ${versions}`;
  await npmInstall(commandStr, { async: true, silent: true });
  log('1执行完成: 安装commitlint');

  // 2. 写入 commitlint.config.js
  const commitlintConfigJs = fs.readFileSync(PATH.IN_COMMITLINT_CONFIG, 'utf8');
  fs.outputFileSync(PATH.USE_COMMITLINT_CONFIG, commitlintConfigJs);
  log('2执行完成: 写入commitlint.config.js');

  // 3. husky 添加钩子 commit-msg: 需判断是否已有husky
  if (!hasInstallHusky()) {
    const cmdInstallHusky = 'npx husky-init && npm install';
    await npmInstall(cmdInstallHusky, { async: true, silent: true });
  }
  if (!hasCommitlint()) {
    log('has not commitlint in commit-msg');
    shell.exec('npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"', { silent: true });
  }
  log('3执行完成: husky添加钩子commit-msg');

  // 4.【可选】测试效果
  if (showEnv()) {
    log('4执行完成: 测试效果');
    shell.exec('echo "foo" | ./node_modules/.bin/commitlint');
  }

  spinner.succeed(chalk.green('commitlint 安装成功'));
}
function hasInstallHusky() {
  let isInPackageJson = false;
  let isExistHuskySH = false;
  const packageJson = fs.readJsonSync(PATH.USE_PACKAGE_JSON);
  if (packageJson && packageJson.devDependencies && packageJson.devDependencies.husky) {
    isInPackageJson = true;
  }
  if (fs.existsSync(PATH.USE_HUSKY_SH)) {
    isExistHuskySH = true;
  }
  return isInPackageJson && isExistHuskySH;
}
function hasCommitlint() {
  if (!fs.existsSync(PATH.USE_HUSKY_COMMIT_MSG)) {
    return false;
  }
  const preCommit = fs.readFileSync(PATH.USE_HUSKY_COMMIT_MSG, 'utf8');
  // todo: 是否要完全匹配？
  return preCommit.includes('commitlint');
}

// 2. 安装 git-cz
async function installGitCZ() {
  console.log('开始安装 git-cz');
  // 1. 全局安装依赖
  const versions = getInitVersions(PATH.IN_VERSION_GITCZ);
  const cmdInstallGitCZ = `npm install -g ${versions}`;
  await npmInstall(cmdInstallGitCZ, { async: true, silent: true });
  log('5执行完成: 安装git-cz');

  // 2. 初始化 git-cz
  const spinnerText = {
    start: '正在初始化git-cz...',
    succeed: '初始化git-cz成功！',
    fail: '初始化git-cz失败！'
  };
  const cmdInitGitCZ = 'commitizen init git-cz -D -E --force';
  await npmInstall(cmdInitGitCZ, { async: true, silent: true }, spinnerText);
  log('6执行完成: 初始化git-cz');

  // 3. 创建 changelog.config.js 并写入
  const changelogConfigJs = fs.readFileSync(PATH.IN_CHANGELOG_CONFIG, 'utf8');
  fs.outputFileSync(PATH.USE_CHANGELOG_CONFIG, changelogConfigJs);
  log('7执行完成: 写入changelog.config.js');

  spinner.succeed(chalk.green('git-cz 安装成功'));
}

// 3. 安装 changelog
async function installChangeLog() {
  console.log('开始安装 change log');
  // 1. 安装依赖
  const versions = getInitVersions(PATH.IN_VERSION_CHANGELOG);
  const cmdInstallChangelog = `npm install -D ${versions}`;
  await npmInstall(cmdInstallChangelog, { async: true, silent: true });
  log('8执行完成: 安装changelog');

  // 2. 写入 package.json: npm run changelog, npm run changelog:all
  const scripts = [...SCRIPTS.values()];
  scripts.map(x => {
    addScript(x.key, x.value);
  });
  log('9执行完成: 写入package.json');

  spinner.succeed(chalk.green('change log 安装成功'));
}

// 4. 更新tips.md
async function updateTipsCommitlint() {
  await updateTips(PATH.USE_TIPS_MD, PATH.IN_TIPS_MD);
}

module.exports = {
  installMac
};
