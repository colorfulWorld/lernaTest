### 说明

脚本用于一键安装功能所需依赖，目前支持以下功能：

- **eslint+husky**: `commit` 提交代码时校验 `npm run lint`，使用 `eslint` 校验代码，通过才可 `commit`。可使用 `npm run lint:fix` 格式化代码。
- **commitlint+git cz+changelog**：
  - 提交代码时校验 `commit message`，符合规范的才可提交。
  - 使用 `git cz` 代替 `git commit`，用工作流问答的方式填写符合规范的 `commit message`。
  - 使用 `npm run changelog` 或 `npm run changelog:all` 在 `CHANGELOG.md` 生成版本更新记录。



### 关于路径

- `USE_XXX`: 使用脚本时所在路径，`./xxx`
- `IN_XXX`: 开发的脚本所在的路径，`path.resolve(__dirname, './xxx')`

### TODO

- [ ] `windows` 平台： `eslint+husky` 配置 `~/.huksy` 中的 `PATH` 环境变量
- [ ] `windows` + `mac` 平台：添加 `eslint-loader`，并配置 `webpack.dev.js`
- [x] 安装时可选依赖的 `versions` 版本，添加多个 `version` 文件
- [ ] 配置 `less/css` 缩进等格式