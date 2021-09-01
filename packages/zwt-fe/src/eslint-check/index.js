const { isMac, isWindows, log } = require('../../utils');
const { installMac } = require('./init-mac');
const { installWindows } = require('./init-windows');

async function main() {
    if (isMac()) {
        await installMac();
    } else if (isWindows()) {
        await installWindows();
    } else {
        log('当前不是Mac或Windows平台');
    }
}

module.exports = {
    main
};
