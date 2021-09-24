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

let initParams = {};
const setInitParams = answer => initParams = answer;
const getInitParams = () => (console.log('initParams: ', initParams));

const getList = () => values.map(x => `${x.key} | ${x.description}`);
const getListKey = answer => answer.split('|')[0].trim();
const getListKeys = () => values.map(x => x.key);
const getListUrl = key => values.find(x => x.key === key).url;
const getMultiVersions = function (value) {
    const key = getListKey(value);
    return values.find(x => x.key === key).multiVersions;
};
const hasMultiVersions = value => !!getMultiVersions(value);

/*
* node15以上版本对应npm>=7,
* npm>=7时，可以使用 `npm set-script key "value"`写入package.json的script
* */
const addScript = function (key = '', value = '') {
    // 获取NPM版本
    let version = getNodeVersion();
    // todo: package.json不存在
    if(version > 15) {
        shell.exec(`npm set-script ${key} "${value}"`);
        log(`node>15: ${key}  ${value}`);
    } else {
        let json = fs.readJsonSync(PATH.USE_PACKAGE);
        json['scripts'][key] = value;
        fs.writeJsonSync(PATH.USE_PACKAGE, json, { spaces: 2 });
        log(`node<15: ${key}  ${value}`);
    }
};
/*
* 获取node版本，
* */
function getNodeVersion() {
    // 获取NPM版本
    let versionStr = shell.exec('node --version', { silent: true }).stdout.trim();
    return Number(versionStr.match(/^v(\d*)\..*$/)[1]);
}

/*
* 获取npm install version版本
* version = 0时不添加后缀，非0时，添加后缀
* 例如：version.json, version_1.json, version-xxx_1.json
* */
function getInitVersions(path, PATH) {
    let finalPath = getPathByVersion(path, PATH);
    const versions = fs.readJsonSync(finalPath);
    let result = '';
    Object.keys(versions).map(x => {
        if (x !== 'version') {
            result += `${x}@${versions[x]} `;
        }
    });
    return result;
}
/*
* 根据选择的version获取路径
* 如未选择version，使用默认路径
* */
function getPathByVersion(path, PATH) {
    let result = path;
    if (initParams && initParams.version && PATH) {
        let key = findKey(PATH, path);
        result = PATH[`${key}_${initParams.version}`];
    }
    return result;
}

// 根据value获取对象的key
function findKey (obj, value, compare = (a, b) => a === b) {
    return Object.keys(obj).find(k => compare(obj[k], value));
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
    const copyFileText = {
        start: '开始更新 tips.md',
        succeed: '执行完成: 更新tips.md'
    };
    await copyFile(inPath, usePath, false, copyFileText);
    spinner.succeed(chalk.green('tips.md 更新成功'));
}

/*
* inPath: 拷贝来源文件路径
* usePath: 拷贝目的地文件路径
* isCover: 是否覆盖已有目的地文件
* copyFileText: log文案 {start: xx, succeed: yy}
* */
async function copyFile(inPath, usePath, isCover=false, copyFileText) {
    const isLog = copyFileText && Object.keys(copyFileText) && Object.keys(copyFileText).length > 0;
    if (isMac()) {
        await copyFileMac(inPath, usePath, isCover, copyFileText, isLog);
    } else if (isWindows()) {
        await copyFileWindows(inPath, usePath, isCover, copyFileText, isLog);
    } else {
        log('当前不是Mac或Windows平台');
    }
}
async function copyFileMac(inPath, usePath, isCover, copyFileText, isLog) {
    isLog && log(`mac平台: ${copyFileText.start}`);
    // 拷贝写入文件
    let cmdUpdateTips = `less ${inPath} >> ${usePath}`;
    if (isCover) {
        cmdUpdateTips = `less ${inPath} > ${usePath}`;
    }
    shell.exec(cmdUpdateTips, { silent: true });
    isLog && log(`mac平台: ${copyFileText.succeed}`);
}
async function copyFileWindows(inPath, usePath, isCover, copyFileText, isLog){
    isLog && log(`windows平台: ${copyFileText.start}`);
    // 写入 tips.md
    const content = fs.readFileSync(inPath, 'utf8');
    let contentFinal = '';
    if (!isCover) {
        const isExistTips = fs.existsSync(usePath);
        if (isExistTips) {
            contentFinal = fs.readFileSync(usePath, 'utf8');
        }
    }
    contentFinal += content;
    fs.outputFileSync(usePath, contentFinal);
    isLog && log(`windows平台: ${copyFileText.succeed}`);
}

module.exports = {
    templatesJson: data,
    setInitParams,
    getInitParams,
    getList,
    getListKey,
    getListKeys,
    getListUrl,
    hasMultiVersions,
    getMultiVersions,
    addScript,
    getNodeVersion,
    getInitVersions,
    getPathByVersion,
    npmInstall,
    isMac,
    isWindows,
    setEnvTrue,
    setEnvFalse,
    showEnv,
    log,
    execSilent,
    updateTips,
    copyFile
};


