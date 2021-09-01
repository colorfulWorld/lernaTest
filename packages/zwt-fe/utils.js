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
const showEnv = () => ENV_ZWT_DEV;

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
const spinnerTextDefault = {
    start: '正在下载依赖...',
    succeed: '下载依赖成功！',
    fail: '下载依赖失败！'
};
const npmInstall = async function (command, args, spinnerText = spinnerTextDefault) {
    return new Promise((resolve) => {
        if (Object.keys(spinnerText).length < 3) {
            log(`npmInstall.spinnerText已重置: ${command} ${spinnerText}`);
            spinnerText = spinnerTextDefault;
        }
        spinner.start(`${spinnerText.start}\r\n`);
        shell.exec(command, args, function (code, stdout, stderr) {
            // todo: 如何判断失败
            if (code > 0) {
                spinner.fail( chalk.red(`${spinnerText.fail}`));
                log('stderr: ', stderr);
                process.exit(1);
            }
            spinner.succeed(`${spinnerText.succeed}`);
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

/*
* exec不输出到控制台，一般用于windows平台
* 只能同步执行sync
* */
const execSilent = (cmd, options) => {
    !options && (options = {});
    options['silent'] = true;
    shell.exec(cmd, options);
};

/*
* 更新tips.md
* usePath: 使用时路径
* inPath: 开发时路径
* */
async function updateTips(usePath, inPath) {
    if (isMac()) {
        await updateTipsMac(usePath, inPath);
    } else if (isWindows()) {
        await updateTipsWindows(usePath, inPath);
    } else {
        log('当前不是Mac或Windows平台');
    }
}
async function updateTipsMac(usePath, inPath) {
    log('开始更新 tips.md');
    // 写入 tips.md
    const cmdUpdateTips = `less ${inPath} >> ${usePath}`;
    shell.exec(cmdUpdateTips, { silent: true });
    log('执行完成: 更新tips.md');

    spinner.succeed(chalk.green('tips.md 更新成功'));
}
async function updateTipsWindows(usePath, inPath) {
    log('开始更新 tips.md');
    // 写入 tips.md
    const tips = fs.readFileSync(inPath, 'utf8');
    const isExistTips = fs.existsSync(usePath);
    let tipsFinal = '';
    if (isExistTips) {
        tipsFinal = fs.readFileSync(usePath, 'utf8');
    }
    tipsFinal += tips;
    fs.outputFileSync(usePath, tipsFinal);
    log('执行完成: 更新tips.md');

    spinner.succeed(chalk.green('tips.md 更新成功'));
}

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
    showEnv,
    log,
    execSilent,
    updateTips
};


