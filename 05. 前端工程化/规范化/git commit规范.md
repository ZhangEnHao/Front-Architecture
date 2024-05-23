## 前言

git 规定提交时必须要写提交信息，作为改动说明，保存在 `commit` 历史中，方便回溯。规范的 `log` 不仅有助于他人 `review`, 还可以有效的输出 `CHANGELOG`，甚至对于项目的研发质量都有很大的提升。

`Git Commit Message` 应该清晰明了，要用统一标准、精简的语言说明本次提交的目的，其主要作用是为了后续的搜索、版本的回滚、合并冲突的追溯等操作。

## Angular commit Standard

`AngularJS` 的规范，它是由 `Google` 推出的一套提交消息规范标准，也是目前使用范围最广的规范。有一套合理的[手册](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)也较为[系统化](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#toc10)；并且还有配套的工具可以供我们使用。

**使用 `Angular commit Standard` 的作用**

- 方便查看每次提交版本更新内容：`git log <last tag> HEAD --pretty=format:%s`
- 方便的查找某个关键技术处在哪个版本：`git log <last release> HEAD --grep feature`
- 可以自动生成 `CHANGELOG`
- 可读性好，方便做 `code revieing`
- 方便 `git blame` 跟踪工程历史，追究模块责任，提高代码质量

## 规范执行方案

![规范执行方案](./images/328599-20190123104101160-845368160.png)

### 规范目标

- 允许通过脚本生成 `CHANGELOG.md`
- 可以通过范围的关键词，快速的搜索到指定版本

```shell
git log HEAD --grep feat(package.json) # 在package.json文件里新增的特性。
```

### 格式要求

```shell
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- 提交消息由页眉、正文和页脚组成，由空行分隔，其中 `Header` 一行是必须的，`Body` 和 `Footer` 是可选的。
- 建议提交的说明部分只占用一行，任何行都不能超过 100 个字符。
- 允许使用 GitHub 以及各种 Git 工具阅读消息

### 格式要求详细说明

#### Header

只有一行，包括三个字段：`type`（必需）、`scope`（可选）和 `subject`（必需）。

1. `<type>`

用于说明 `commit` 的类别，只允许使用下面 7 个标识。如果 `type`为 `feat` 和 `fix`，则该 `commit` 将肯定出现在 `CHANGELOG` 中。其他情况（ `docs`、`chore`、`style`、`refactor`、`test` ）由你决定，要不要放入 `CHANGELOG`，建议不要。

| 类型     | 描述                                              |
| :------- | :------------------------------------------------ |
| feat     | 新增 feature                                      |
| fix      | 修复 bug                                          |
| docs     | 仅仅修改了文档（documentation）                   |
| style    | 空格，逗号，缩进等格式（不影响代码运行的变动）    |
| refactor | 重构（即不是新增功能，也不是修改 bug 的代码变动） |
| perf     | 优化相关，比如提升性能、集成测试等                |
| test     | 测试用例，包括单元测试，集成测试等                |
| chore    | 改变构建流程或者增加依赖库、辅助工具等            |
| revert   | 回滚到上一版本                                    |

**Revert**

特殊情况：如果当前 `commit` 用于撤销以前的 `commit` ，则必须以 `revert`:开头，后面跟着被撤销 `Commit` 的 `Header`。

```shell
revert: feat(pencil): add 'graphiteWidth' option
This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

`Body` 部分的格式是固定的，必须写成 `This reverts commit &lt;hash>.`，其中的 `hash`是被撤销 `commit` 的 `SHA` 标识符。

如果当前 `commit` 与被撤销的 `commit`，在同一个发布（ `release`）里面，那么它们都不会出现在 `Change log` 里面。如果两者在不同的发布，那么当前 `commit` ，会出现在 `Change log` 的 `Reverts` 小标题下面。

2. `<scope>`

范围：指定提交更改位置的任何内容，用于说明 `commit` 影响的范围。比如数据层、控制层、视图层等等，如果你的修改影响了不止一个 `scope`，可以使用\*代替。

例如：

- 对 `package.json` 文件新增依赖库，`chore(package.json)` : 新增依赖库
- 或对代码进行重构，`refacto(weChat.vue)`: 重构微信进件

3. `<subject>`

是 `commit` 目的的简短描述，不超过 50 个字符。如果没有更合适的范围，可以直接写提交内容。

- 第一个字母小写
- 结尾不加句号（.）

#### Body

对本次 `commit` 的详细描述，可以分成多行。

#### Footer

Footer 部分只用于以下两种情况：

1. 不兼容变动

如果当前代码与上一个版本不兼容，则 Footer 部分以 `BREAKING CHANGE` 开头，后面是对变动的描述、以及变动理由和迁移方法。

```shell

BREAKING CHANGE: isolate scope bindings definition has changed.

To migrate the code follow the example below:

Before:

scope: {
  myAttr: 'attribute',
}

After:

scope: {
  myAttr: '@',
}

The removed `inject` wasn't generaly useful for directives so there should be no code using it.

```

2. 关闭 Issue

如果当前 `commit` 针对某个 `issue`，那么可以在 `Footer` 部分关闭这个 `issue` 。

```shell
Closes #234
```

## 使用工具

因为是 `Google AngularJS` 的标准规范，所以提供了多种工具。如生成 `CHANGELOG.md`，提
交工具，检查工具。

工具列表：

1. **提交工具 `commitizen`**，如果是初学者，可以使用 `commitizen ` 帮助我们生成消息
2. **生成 `CHANGELOG.md`**，把 `Git Commit Message` 的消息自动生成 `CHANGELOG.md`
3. **`Message` 检查**，是否有“不符合”规范的内容，可以在 `GitHook` 中使用

### 1. 提交工具

#### A. ` commitizen （cz-cli）`

(1) 安装全局依赖

```shell
npm install -g commitizen
```

(2) 在项目中安装

然后，在项目目录里，运行下面的命令，使其支持 Angular 的 Commit message 格式。

```shell
commitizen init cz-conventional-changelog --save --save-exact
```

(3) 运行

以后，凡是用到 git commit 命令，一律改为使用 git cz。这时，就会出现选项，用来生成符合格式的 Commit message。

完成之后，运行 `git log` 命令，查看我们刚才提交的 `commit message`。

**优点**：

- 符合业内标准（许多项目使用 AngularJS 的 commit 规范）
- 提交过程更加规范（使用 commitizen 规范工具，风格统一）
- 能够生成风格统一的 commit log（type(scope):subject)

**缺点**：

- 需要安装 commitizen 工具包，使项目更大、更重了（适合大型开源项目）
- 提交过程受约束较大
- 有一定的学习成本

#### B. `git` 提交信息模板 (`git commit`模板)

团队对提交信息有格式要求，可以在系统上创建一个文件，并配置 `git` 把它作为默认的模板，这样可以更加容易地使提交信息遵循格式。

**(1) 建立模板文件**

在项目中建立 .git_template 文件，内容可以自定义：

```
# headr: <type>(<scope>): <subject>
# - type: feat, fix, docs, style, refactor, test, chore
# - scope: can be empty
# - subject: start with verb (such as 'change'), 50-character line
#
# body: 72-character wrapped. This should answer:
# * Why was this change necessary?
# * How does it address the problem?
# * Are there any side effects?
#
# footer:
# - Include a link to the issue.
# - BREAKING CHANGE
#
```

**(2) 设置模板**

运行如下命令：

```shell
# 这个命令只能设置当前分支的提交模板
git config commit.template   [模板文件名]
# 这个命令能设置全局的提交模板，注意global前面是两杠
git config  — —global commit.template   [模板文件名]
```

**(3) 提交代码**

- 先使用 `git add` 添加代码
- 使用 `git commit` 按照模板填写
- 最后 `git push` 推送到远端

**优点**：

- 规则可配置，更自由
- 配置方式简洁（只需添加配置文件）

**缺点**：

- 便利性差，每次都要用 vim 编辑器填写模板
- 易出错，没有可靠的校验方式

#### C. 制定适合自己的 `git commit` 提交规范

第一种方式适合大型开源项目，我们如果也照搬会比较麻烦，但我们可以借鉴 type(scope): subject 的提交格式，也算是与大厂同步；

第二种方式虽然自由，但是也不比较麻烦，要配置模板。

因此，我们只模仿 type(scope): subject 的提交格式，不使用工具 or 模板校验，靠大家**自觉遵守**即可。

**格式**

```shell
type: description
```

**(1) type 类型**

`type` 是 `commit` 的类别，只允许如下几种标识：

- fix: 修复 bug
- add: 新功能
- update: 更新
- style : 代码格式改变
- test: 增加测试代码
- revert: 撤销上一次的 commit
- build: 构建工具或构建过程等的变动，如：gulp 换成了 webpack，webpack 升级等

**(2) description**

description 是对本次提交的简短描述。

不超过 50 个字符。

推荐以动词开头，如：设置、修改、增加、删减、撤销等。

### 2. 检查工具 ( `commitlint` )

`commitlint` 是一个提交验证工具。原理是可以在实际的 git commit 提交到远程仓库之前使用 git 钩子来验证信息。提交不符合规则的信息将会被阻止提交到远程仓库。

对于 `Conventional Commits` 规范，社区已经整理好了 `@commitlint/config-conventional` 包，我们只需要安装并启用它就可以了。

首先安装 commitlint 以及 conventional 规范：

```shell
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

接着在 `package.json` 中配置 `commitlint` 脚本：

```json
"commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  },
```

当然如果你想单独对 commitlint 进行配置的话，需要建立校验文件 `commitlint.config.js`，不然会校验失败。

为了可以在每次 `commit` 时执行 `commitlint` 来 检查我们输入的 `message`，我们还需要用到一个工具 —— `husky`。

`husky` 是一个增强的 `git hook` 工具。可以在 `git hook` 的各个阶段执行我们在 `package.json` 中配置好的 `npm script`。

首先安装 `husky`:

```shell
npm install --save-dev husky
```

接着在 `package.json` 中配置 `commitmsg` 脚本：

```json
"husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
 },
```

`commitlint` 就配置完成。

### 3. 生成 `CHANGELOG.md`

如果你的所有 `Commit` 都符合 `Angular` 格式，那么发布新版本时， `Change log` 就可以用脚本自动生成。生成的文档包括以下三个部分：

- New features
- Bug fixes
- Breaking changes.

每个部分都会罗列相关的 `commit` ，并且有指向这些 `commit` 的链接。当然，生成的文档允许手动修改，所以发布前，你还可以添加其他内容。

#### 生成 `CHANGELOG.md`工具

**A. `conventional-changelog`**

```shell
npm install -g conventional-changelog
cd my-project
conventional-changelog -p angular -i CHANGELOG.md -w
```

可以把它写进 `package.json` 文件的 `script` 中啊。像我这样以后就只要运行 `npm run changlog` 生成 `CHANGELOG: "changelog": "conventional-changelog -p angular -i CHANGELOG.md -w"`。

**B. `standard-version`**

```shell
# 安装 CHANGELOG 生成器
yarn global add standard-version

# 生成文档
standard-version --first-release
```

文档生成后，当前目录下就有 `CHANGELOG.md` 文件了，如果是 `Node` 项目，也会自动更新 `package.json version` 的版本号。

---

参考文档：

- [git commit 代码提交规范](https://segmentfault.com/a/1190000017205604)
- [你可能已经忽略的 git commit 规范](https://juejin.im/post/5e0c82a15188253a907111dc)
- [是时候规范一下我们的 git commit 了](https://www.jianshu.com/p/77c057bc3fb3)
- [git commit 规范指南](https://segmentfault.com/a/1190000009048911)
- [Git Commit 标准化](https://www.cnblogs.com/wubaiqing/p/10307605.html)
- [【前端工程化】git commit 提交规范](https://blog.csdn.net/haokur/article/details/90265691)
