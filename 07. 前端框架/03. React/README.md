## React

React 已经进入了 Hook 为主的阶段，社区的各个库也都在积极拥抱 Hook，虽然它还有很多陷阱和不足，但是这基本上是未来的方向没跑了。这篇文章里我会减少 class 组件的开发技巧的提及，毕竟好多不错的公司也已经全面拥抱 Hook 了。

### 熟练应用

1. 你必须掌握官网中提到的所有技巧，就算没有使用过，你也要大概知道该在什么场景使用。

2. 推荐 React 小书，虽然书中的很多 api 已经更新了，但是核心的设计思想还是没有变。[React.js 小书](http://huziketang.mangojuice.top/books/react)。

3. 关于熟练应用，其实掘金的小册里有几个宝藏

- 诚身大佬（悄悄告诉你，他的职级非常高）的企业级管理系统小册，这个项目里的代码非常深入，而且在抽象和优化方面也做的无可挑剔，自己抽象了 acl 权限管理系统和 router 路由管理，并且引入了 reselect 做性能优化，一年前我初次读的时候，很多地方懵懵懂懂，这一年下来我也从无到有经手了一套带 acl 和权限路由的管理系统后，才知道他的抽象能力有多强。真的是

> 初闻不知曲中意，再闻已是曲中人。

[React 组合式开发实践：打造企业管理系统五大核心模块](https://juejin.im/book/5b1e15f76fb9a01e516d14a0)

- 三元大佬的[React Hooks 与 Immutable 数据流实战](https://juejin.im/book/5da96626e51d4524ba0fd237)，深入浅出的带你实现一个音乐播放器。三元大家都认识吧？那是神，神带你们写应用项目，不学能说得过去吗？

4. 深入理解 React 中的 `key`

- [understanding-reacts-key-prop](https://kentcdodds.com/blog/understanding-reacts-key-prop)。

- [react 中为何推荐设置 key](https://zhuanlan.zhihu.com/p/112917118)。

5. React 官方团队成员对于派生状态的思考：[you-probably-dont-need-derived-state](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)。

### React Hook

你必须熟练掌握 Hook 的技巧，除了官网文档熟读以外：

1. 推荐 Dan 的博客，他就是 Hook 的代码实际编写者之一，看他怎么说够权威了吧？这里贴心的送上汉化版。[useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

看完这篇以后，进入 dan 的[博客主页](https://overreacted.io/zh-hans)，找出所有和 Hook 有关的，全部精读！

2. 推荐黄子毅大佬的精读周刊系列[096.精读《useEffect 完全指南》.md](https://github.com/dt-fe/weekly/blob/v2/096.%E7%B2%BE%E8%AF%BB%E3%80%8AuseEffect%20%E5%AE%8C%E5%85%A8%E6%8C%87%E5%8D%97%E3%80%8B.md)。

注意！不是只看这一篇，而是这个仓库里所有有关于 React Hook 的文章都去看一遍，结合自己的思想分析。

3. Hook 陷阱系列 还是 Dan 老哥的文章，详细的讲清楚了所谓**闭包陷阱**产生的原因和设计中的权衡。[函数式组件与类组件有何不同？](https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/)

4. 去找一些社区的精品自定义 hook，看看他们的开发和设计思路，有没有能融入自己的日常开发中去的。

- [精读《Hooks 取数 - swr 源码》](https://segmentfault.com/a/1190000020964640)。

- [Umi Hooks - 助力拥抱 React Hooks](https://zhuanlan.zhihu.com/p/103150605?utm_source=wechat_session)。

- [React Hooks 的体系设计之一 - 分层](https://zhuanlan.zhihu.com/p/106665408)。

### React 性能优化

React 中优化组件重渲染，这里有几个隐含的知识点。[optimize-react-re-renders](https://kentcdodds.com/blog/optimize-react-re-renders)

如何对 React 函数式组件进行性能优化？[如何对 React 函数式组件进行优化](https://juejin.im/post/5dd337985188252a1873730f)这篇文章讲的很详细，值得仔细阅读一遍。

### React 单元测试

1. 使用 `@testing-library/react` 测试组件，这个库相比起 `enzyme` 更好的原因在于，它更注重于站在**用户的角度**去测试一个组件，而不是测试这个组件的**实现细节**。

[Introducing The React Testing Library](https://kentcdodds.com/blog/introducing-the-react-testing-library)

[Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)

2. 使用 `@testing-library/react-hooks` 测试自定义 Hook。

[how-to-test-custom-react-hooks](https://kentcdodds.com/blog/how-to-test-custom-react-hooks)

### React 和 TypeScript 结合使用

1. [react-typescript-cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet) 这个仓库非常详细的介绍了如何把 React 和 TypeScript 结合，并且给出了一些进阶用法的示例，非常值得过一遍！

2. [React + Typescript 工程化治理实践](https://juejin.im/post/5dccc9b8e51d4510840165e2)这篇文章是蚂蚁金服数据体验技术部的同学带来的，其实除了这里面的技术文章以外，蚂蚁金服的同学也由非常生动给我们讲解了一个高级前端同学是如何去社区寻找方案，如何思考和落地到项目中的，由衷的佩服。

3. 微软的大佬带你写一个类型安全的组件，非常深入，非常过瘾...

[Writing Type-Safe Polymorphic React Components (Without Crashing TypeScript)](https://blog.andrewbran.ch/polymorphic-react-components/)

4. React + TypeScript 10 个需要避免的错误模式。[10-typescript-pro-tips-patterns-with-or-without-react](https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680)

### React 代码抽象思考

1. 何时应该把代码拆分为组件？[when-to-break-up-a-component-into-multiple-components](https://kentcdodds.com/blog/when-to-break-up-a-component-into-multiple-components)

2. 仔细思考你的 React 应用中，状态应该放在什么位置，是组件自身，提升到父组件，亦或是局部 context 和 redux，这会有益于提升应用的性能和可维护性。[state-colocation-will-make-your-react-app-faster](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster/)

3. 仔细思考 React 组件中的状态应该如何管理，优先使用派生状态，并且在适当的时候利用 useMemo、reselect 等库去优化他们。[dont-sync-state-derive-it](https://kentcdodds.com/blog/dont-sync-state-derive-it)

4. React Hooks 的自定义 hook 中，如何利用 reducer 的模式提供更加灵活的数据管理，让用户拥有数据的控制权。[the-state-reducer-pattern-with-react-hooks](https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks)

## Vue 推荐学习资料

![React 推荐学习路径](../images/reactStudy.png)

[React](https://github.com/KieSun/all-of-frontend?utm_source=gold_browser_extension#react)

[React 性能优化 | 包括原理、技巧、Demo、工具使用](https://juejin.cn/post/6935584878071119885)

[React 技术揭秘](https://react.iamkasong.com/)

[从零搭建完整的 React 项目模板(Webpack + React hooks + Mobx + Antd) 【演戏演全套】](https://juejin.cn/post/6844904035099623437)

[KieSun/Chat-Buy-React](https://github.com/KieSun/Chat-Buy-React)

[useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

[2019 年 17 道高频 React 面试题及详解](https://juejin.cn/post/6844903922453200904)

[【React 深入】从 Mixin 到 HOC 再到 Hook](https://juejin.cn/post/6844903815762673671)

[React 16 加载性能优化指南](https://mp.weixin.qq.com/s/XSvhOF_N0VbuOKStwi0IYw)
