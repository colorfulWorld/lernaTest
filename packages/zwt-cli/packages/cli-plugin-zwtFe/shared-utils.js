const fs = require('fs-extra');
const shell = require('shelljs');
const { resolve } = require('path');
const ora = require('ora');
const chalk = require('chalk');

/*
* 导出原生依赖
* */
module.exports = {
    fs,
    shell,
    resolve,
    ora,
    chalk
};
