const { fs, shell, resolve, ora, chalk } = require('./shared-utils');
const spinner = ora();

const PATH = {
  IN_TEMPLATES: resolve(__dirname, './templates.json'),
  USE_PACKAGE: './package.json'
};

const data = fs.readJsonSync(PATH.IN_TEMPLATES);
const values = Object.values(data);

// 设置环境变量，用于log, todo: process.env.XXX无效，缓存问题待解决
let ENV_ZWT_DEV = false;
const setEnvTrue = () => ENV_ZWT_DEV = true;
const setEnvFalse = () => ENV_ZWT_DEV = false;

const getList = function () {
  return values.map(x => `${x.key} | ${x.description}`);
};
const getListUrl = function (key) {
  return values.find(x => x.key === key).url;
};

/*
* node15以上版本对应npm>=7,
* npm>=7时，可以使用 `npm set-script key "value"`写入package.json的script
* */
const addScript = function (key = '', value = '') {
  // 获取NPM版本
  let versionStr = shell.exec('node --version', { silent: true }).stdout.trim();
  let version = Number(versionStr.match(/^v(\d*)\..*$/)[1]);
  // todo: package.json不存在
  if(version > 15) {
    shell.exec(`npm set-script ${key} "${value}"`);
    log('node>15: ', key, value);
  } else {
    let json = fs.readJsonSync(PATH.USE_PACKAGE);
    json['scripts'][key] = value;
    fs.writeJsonSync(PATH.USE_PACKAGE, json, { spaces: 2 });
    log('node<15: ', key, value);
  }
};

/*
* 获取npm install version版本
* */
function getInitVersions(path) {
  const versions = fs.readJsonSync(path);
  let result = '';
  Object.keys(versions).map(x => {
    if (x !== 'version') {
      result += `${x}@${versions[x]} `;
    }
  });
  return result;
}

// NPM安装依赖
const npmInstall = async function (command, args) {
  return new Promise((resolve) => {
    spinner.start('正在下载依赖...\r\n');
    shell.exec(command, args, function (code, stdout, stderr) {
      // todo: 如何判断失败
      if (code > 0) {
        spinner.fail( chalk.red('下载依赖失败！'));
        log('stderr: ', stderr);
        process.exit(1);
      }
      spinner.succeed('下载依赖成功！');
      resolve(stdout);
    });
  });
};

// 判断当前系统
/*
* process.platform可能的值: aix, darwin, freebsd, linux, openbsd, sunos, win32
* */
const isMac = () => {
  return process.platform === 'darwin';
};
const isWindows = () => {
  return process.platform === 'win32';
};

const log = text => {
  ENV_ZWT_DEV && console.log(text);
};

module.exports = {
  templatesJson: data,
  getList,
  getListUrl,
  addScript,
  getInitVersions,
  npmInstall,
  isMac,
  isWindows,
  setEnvTrue,
  setEnvFalse,
  log
};


