const { resolve } = require('../../shared-utils');

// 文件路径, IN: 开发所在路径，USE: 使用所在路径
const PATH = {
  IN_COMMITLINT_CONFIG: resolve(__dirname, './commitlint.config.js'),
  USE_COMMITLINT_CONFIG: './commitlint.config.js',
  IN_CHANGELOG_CONFIG: resolve(__dirname, './changelog.config.js'),
  USE_CHANGELOG_CONFIG: './changelog.config.js',
  IN_VERSION_COMMITLINT: resolve(__dirname, './version-commitlint.json'),
  IN_VERSION_GITCZ: resolve(__dirname, './version-gitcz.json'),
  IN_VERSION_CHANGELOG: resolve(__dirname, './version-changelog.json'),
  USE_PACKAGE_JSON: './package.json',
  USE_HUSKY_SH: './.husky/_/husky.sh',
  USE_HUSKY_COMMIT_MSG: './.husky/commit-msg',
  IN_TIPS_MD: resolve(__dirname, './tips.md'),
  USE_TIPS_MD: './tips.md'
};

// package.json中Scripts
const SCRIPTS = new Map([
  ['changelog', { key: 'changelog', value: 'conventional-changelog -p angular -i CHANGELOG.md -s'}],
  ['changelogAll', { key: 'changelog:all', value: 'conventional-changelog -p angular -i CHANGELOG.md -s -r 0' }]
]);

module.exports = {
  path: PATH,
  scripts: SCRIPTS
};
