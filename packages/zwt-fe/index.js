#!/usr/bin/env node

// 引入相关依赖
const { prompt } = require('inquirer');
const program = require('commander');
const utils = require('./utils');

const log = utils.log;

log('start: ~~~');
program.usage('<command>');
program.version(require('./package.json').version);

// 开发环境，显示dev log
program
    .command('dev')
    .description('dev mode: show more logs')
    .alias('d')
    .action(() => {
        utils.setEnvTrue();
        init();
    });

program.parse(process.argv);
if (!program.args.length || process.argv[2] !== 'dev') {
    utils.setEnvFalse();
    init();
}


// 选择脚本

function init() {
    // todo: 兼容已安装的依赖
    const promptList = [
        {
            type: 'list',
            message: '请选择要安装的功能',
            name: 'func',
            choices: utils.getList()
        }
    ];
    prompt(promptList).then(answer => {
        const key = answer['func'].split('|')[0].trim();
        const url = utils.getListUrl(key);
        const funcModule = require(url);
        funcModule.main();
    }).catch(error => {
        console.log('prompt error: ', error);
    });
}
