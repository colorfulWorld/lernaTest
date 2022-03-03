---

### commit lint 教程

该脚本添加3项功能，在项目目录下，使用终端输入以下命令，可执行对应功能。

#### 版本要求

- node >= 12；

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

- `git cz` 或 `git-cz`： 以工作流的方式输入符合规则的 `commit message`。

- `npm run changelog`：在 `CHANGELOG.md` 内生成 git提交记录，只添加在最后，不覆盖文件

- `npm run changelog:all`：在 `CHANGELOG.md` 内生成**从项目创建开始到现在**的 `git` 提交记录，会覆盖文件。

- `npm run changelog` 规则：

  - 规则：生成 `CHANGELOG.md` 内最后一个 `version` 到当前 `package.json.version` 之间的git提交记录。所以，生成前需 **手动修改package.json中的version**，或使用 **`npm version major|minor|patch` 自动更新package.json中的version**；

  - 规则：根据 package.json中version的 **tag** 来匹配，生成2个 **tag** 之间的记录；[官方说明](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-cli/README.md)

  - 规则：只会生成 `feat`、`fix`、`revert` 的记录；

  - **推荐的流程**

    1. `git commit` 代码；
    2. 更新 `package.json` 中的 `version`；
    3. 执行命令 `npm run changelog`；
    4. `git commit ` `package.json` 和 `CHANGELOG.md` 文件；
    5. 打标签 `Tag`；
    6. `git push`；

  - **使用 `npm version`**

    - 在 `package.json` 添加以下代码：

      - ```json
        {
          "scripts": {
            "version": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md"
          }
        }
        ```

    - `git commit` 代码；

    - 执行命令 `npm version [patch|minor|major]`

    - `git push`；

