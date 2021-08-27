### eslint-check 教程

该脚本添加3项功能，在项目目录下，使用终端输入以下命令，可执行对应功能。

#### 新增功能

1. `git commit` 提交代码前自动使用 `npm run lint` `(eslint)` 对代码进行校验，校验通过才能提交成功。
2. 添加终端命令 `npm run lint` 校验所有 `.vue, .js` 代码。
3. 添加终端命令 `npm runl lint:fix` 校验并自动修复所有 `.vue,.js` 代码。

#### 终端命令

- `npm run lint`：校验所有 `.vue, .js` 代码。
- `npm run lint:fix`：校验并自动修复所有 `.vue,.js` 代码。

---

### commit lint 教程

该脚本添加3项功能，在项目目录下，使用终端输入以下命令，可执行对应功能。

#### 新增功能

1. `git commit` 时添加钩子，校验 `message` 格式，格式校验通过才能提交成功。
   1. `message` 格式为：`Header`，`Body` 和 `Footer`；例如 `feat: 新增xx功能`；
   2. `Header`: `<type>(scope): <subject>`；
      1. `type`：**必填**，为以下列表其中一个；
         1. `feat`：新功能；
         2. `fix`：修复bug；
         3. `docs`：文档、注释；
         4. `style`：代码格式（不影响代码运行的变动改）；
         5. `refactor`：重构（既不增加新功能，也不是修复bug）；
         6. `perf`：性能优化；
         7. `test`：增加测试；
         8. `ci`：持续集成软件的配置和 `package` 中的 `script` 命令的改动；
         9. `chore`：构建过程或辅助工具的改动；
         10. `revert`：回退；
         11. `build`：打包；
      2. `scope`：**【可选】**，当前提交记录作用的范围；
      3. `subject`：`commit` 的简短描述；
   3. `Body`: **【可选】**，`commit` 的详细描述；
   4. `Footer`:
      1. **不兼容变更**：**【可选】**，以 `BREAKING CHANGE:` 开头，后面是对变更的描述；
      2. **关闭缺陷**：**【可选】**，以 `Closes:` 开头，后面接 `#xxx`，表示关闭的 `issue` 编号；
2. 添加终端命令 `git cz` 和 `git-cz`(一样)，使用工作流的方式生成校验通过的 `message`，并自动提交。
3. 添加终端命令 `npm run changelog` 或 `npm run changelog:all`(不一样)，生成 `git` 提交记录，可用于发版的**更新日志**。

#### 终端命令

- `git cz` 或 `git-cz`： 以工作流的方式输入符合规则的 `commit message`
- `npm run changelog`:  在 `CHANGELOG.md` 内生成自上次 `npm run changelog` 后更新的 `git` 提交记录。只添加在最后，不覆盖文件。
- `npm run changelog:all`：在 `CHANGELOG.md` 内生成从项目创建开始到现在的 `git` 提交记录，会覆盖文件。

