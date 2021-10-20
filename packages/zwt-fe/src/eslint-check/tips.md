---

### eslint-check 教程

该脚本添加3项功能，在项目目录下，使用终端输入以下命令，可执行对应功能。

#### 新增功能

1. `git commit` 提交代码前自动使用 `npm run lint` `(eslint)` 对代码进行校验，校验通过才能提交成功。
   1. 目前会校验以下代码：
   2. `.vue`: `html`、`[c,sa,sc,le]ss`、`js`。
   3. `*.js`。
   4. `*.[c,sa,sc,le]ss`。
2. 添加终端命令 `npm run lint` 校验所有 `.vue, .js, .[c,sa,sc,le]ss` 代码。
3. 添加终端命令 `npm runl lint:fix` 校验并自动修复所有 `.vue,.js, .[c,sa,sc,le]ss` 代码。
4. 使用 `HUSKY=0 xxx`，可跳过 `husky` 的钩子，即 `npm run lint` 校验。比如：
   1. `HUSKY=0 git commit -m "xxx"`；
   2. `HUSKY=0 git cz` (需安装 `commitlint` )；

#### 终端命令

- `npm run lint`：校验所有 `.vue, .js, .[c,sa,sc,le]ss` 代码。
- `npm run lint:fix`：校验并自动修复所有 `.vue, .js, .[c,sa,sc,le]ss` 代码。

