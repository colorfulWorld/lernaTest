### 说明

脚本用于一键安装功能所需依赖，目前支持以下功能：

- **eslint+husky**: `commit` 提交代码时校验 `npm run lint`，使用 `eslint` 校验代码，通过才可 `commit`。可使用 `npm run lint:fix` 格式化代码。



### 关于路径

- `USE_XXX`: 使用脚本时所在路径，`./xxx`
- `IN_XXX`: 开发的脚本所在的路径，`path.resolve(__dirname, './xxx')`

