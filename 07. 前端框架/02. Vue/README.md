## Vue

Vue 方面的话，我主要是师从黄轶老师，跟着他认真走，基本上在 Vue 这方面你可以做到基本无敌。

### 熟练运用

1. 对于 Vue 你必须非常熟练的运用，官网的 api 你基本上要全部过一遍。并且你要利用一些高级的 api 去实现巧妙的封装。举几个简单的例子。

2. 你要知道怎么用 slot-scope 去做一些数据和 ui 分离的封装。 以[vue-promised](https://github.com/posva/vue-promised)这个库为例。 Promised 组件并不关注你的视图展示成什么样，它只是帮你管理异步流程，并且通过你传入的 slot-scope，在合适的时机把数据回抛给你，并且帮你去展示你传入的视图。

3. 你需要熟练的使用 Vue.extends，配合项目做一些命令式 api 的封装。并且知道它为什么可以这样用。（需要具备源码知识）[confirm 组件](https://github.com/sl1673495/vue-netease-music/blob/master/src/base/confirm.vue)。

4. 你要开始使用 JSX 来编写你项目中的复杂组件了，比如在我的网易云音乐项目中，我遇到了一个[复杂的音乐表格需求](https://juejin.im/post/5d40fa605188255d2e32c929)，支持搜索文字高亮、动态隐藏列等等。

当然对于现在版本的 Vue，JSX 还是不太好用，有很多属性需要写嵌套对象，这会造成很多不必要的麻烦，比如没办法像 React 一样直接把外层组件传入的 props 透传下去，Vue3 的 rfc 中提到会把 vnode 节点的属性进一步扁平化，我们期待得到接近于 React 的完美 JSX 开发体验吧。

5. 你要深入了解 Vue 中 nextTick 的原理，并且知道为什么要用微任务队列优于宏任务队列，结合你的 eventloop 知识深度思考。最后融入到你的**异步合并优化**的知识体系中去。[Vue 源码详解之 nextTick：MutationObserver 只是浮云，microtask 才是核心！](https://segmentfault.com/a/1190000008589736)。

6. 你要能理解 Vue 中的高阶组件。关于这篇文章中为什么 slot-scope 不生效的问题，你不能看他的文章讲解都一头雾水。（需要你具备源码知识）[探索 Vue 高阶组件 | HcySunYang](https://segmentfault.com/p/1210000012743259/read)。

7. 推荐一下我自己总结的 Vue 高阶组件文章，里面涉及到了一些进阶的用法。[Vue 进阶必学之高阶组件 HOC](https://juejin.im/post/5e8b5fa6f265da47ff7cc139)。

8. 对于 Vuex 的使用必须非常熟练，知道什么时候该用 Vuex，知道怎么根据需求去编写 Vuex 的 plugin，合理的去使用 Vuex 的 subscribe 功能完成一些全局维度的封装，比如我对于 Vuex 中 action 的错误处理懒得一个个去`try catch`，就封装了一个[vuex-error-plugin](https://github.com/sl1673495/vuex-error-plugin/blob/master/plugin.js)。代码很简单，重要的是去理解为什么能这样做。这里用了 `monkey patch` 的做法，并不是很好的实践，仅以此作为引子。

9. 对于 vue-router 的使用必须非常熟练，知道什么需求需要利用什么样的 router 钩子，这样才能 hold 住一个大型的项目，这个我觉得官方仓库里的进阶中文文档其实很好，不知道为什么好像没放在官网。[vue-router-advanced](https://github.com/vuejs/vue-router/tree/dev/docs/zh/guide/advanced)。

10. 理解虚拟 DOM 的本质，虚拟 DOM 一定比真实 DOM 更快吗？这篇是尤雨溪的回答，看完这个答案，相信你会对虚拟 DOM 有更进一步的认识和理解。[网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么？](https://www.zhihu.com/question/31809713/answer/53544875)。

### 源码深入

1. 你不光要熟练运用 Vue，由于 Vue 的源码写的非常精美，而且阅读难度不是非常大，很多人也选择去阅读 Vue 的源码。视频课这里推荐黄轶老师的 Vue 源码课程。这里也包括了 Vuex 和 vue-router 的源码。[Vue.js 源码全方位深入解析 （含 Vue3.0 源码分析）](https://coding.imooc.com/class/228.html)。

2. 推荐 HcySunYang 大佬的 Vue 逐行分析，需要下载 git 仓库，切到 elegant 分支自己本地启动。[Vue 逐行级别的源码分析](https://github.com/HcySunYang/vue-design)。

3. 当然，这个仓库的 master 分支也是宝藏，是这个作者的渲染器系列文章，脱离框架讲解了 vnode 和 diff 算法的本质。[组件的本质](http://hcysun.me/vue-design/zh/essence-of-comp.html#%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BA%A7%E5%87%BA%E6%98%AF%E4%BB%80%E4%B9%88)。

### Vue3 展望

Vue3 已经发布了 Beta 版本，你可以提前学习 Hook 相关的开发模式了。这里推荐一下我写的这篇 Vue3 相关介绍：

[Vue3 究竟好在哪里？（和 React Hook 的详细对比）](https://juejin.im/post/5e9ce011f265da47b8450c11)

### Vue3 源码

对于响应式部分，如果你已经非常熟悉 Vue2 的响应式原理了，那么 Vue3 的响应式原理对你来说应该没有太大的难度。甚至在学习之中你会相互比较，知道 Vue3 为什么这样做更好，Vue2 还有哪部分需要改进等等。

Vue3 其实就是把实现换成了更加强大的 Proxy，并且把响应式部分做的更加的抽象，甚至可以，不得不说，Vue3 的响应式模型更加接近**响应式类库**的核心了，甚至`react-easy-state`等 React 的响应式状态管理库，也是用这套类似的核心做出来的。

再次强调，非常非常推荐学习 Vue3 的`@vue/reactivity`这个分包。

1. [带你彻底搞懂 Vue3 的 Proxy 响应式原理！TypeScript 从零实现基于 Proxy 的响应式库](https://juejin.im/post/5e21196fe51d454d523be084)。

2. [带你彻底搞懂 Vue3 的 Proxy 响应式原理！基于函数劫持实现 Map 和 Set 的响应式](https://juejin.im/post/5e23b20f51882510073eb571)。

3. [深度解析：Vue3 如何巧妙的实现强大的 computed](https://juejin.im/post/5e2fdf29e51d45026866107d)。

在学习之后，我把@vue/reactivity 包轻松的集成到了 React 中，做了一个状态管理的库，这也另一方面佐证了这个包的抽象程度：

[40 行代码把 Vue3 的响应式集成进 React 做状态管理](https://juejin.im/post/5e70970af265da576429aada)。

## 社区讨论

### 为什么 Vue3 不需要时间切片？

尤雨溪解释关于为什么在 Vue3 中不加入 React 时间切片功能？并且详细的分析了 React 和 Vue3 之间的一些细节差别，狠狠的吹了一波 Vue3（爱了爱了）。

[Why remove time slicing from vue3?](https://github.com/vuejs/rfcs/issues/89)

### Vue3 的 composition-api 到底好在哪？

Vue3 的 functional-api 相关的 rfc，尤大舌战群儒，深入浅出的为大家讲解了 Vue3 的设计思路等等。

[Amendment proposal to Function-based Component API](https://github.com/vuejs/rfcs/issues/63)

### Vue3composition-api 的第一手文档

vue-composition-api 的 rfc 文档，在国内资料还不齐全的情况下，我去阅读了[vue-composition-api-rfc](https://vue-composition-api-rfc.netlify.com/#summary) 英文版文档，对于里面的设计思路叹为观止，学到了非常非常多尤大的思想。

总之，对于你喜欢的仓库，都可以去看看它的 issue 有没有看起来感兴趣的讨论，你也会学到非常多的东西。并且你可以和作者保持思路上的同步，这是非常难得的一件事情。

### 关于 Hook 的一些收获

我在狠狠的吸收了一波尤大对于 Vue3 composition-api 的设计思路的讲解，新旧模式的对比以后，这篇文章就是我对 Vue3 新模式的一些见解。

[Vue3 Composition-Api + TypeScript + 新型状态管理模式探索。](https://juejin.im/post/5e0da5606fb9a048483ecf64)

本实战对应仓库：[vue-bookshelf](https://github.com/sl1673495/vue-bookshelf)

并且由于它和 `React Hook` 在很多方面的思想也非常相近，这甚至对于我在 `React Hook` 上的使用也大有裨益，比如代码组织的思路上，

在第一次使用 `Hook` 开发的时候，大部分人可能还是会保留着以前的思想，把 `state` 集中起来定义在代码的前一大段，把 `computed` 集中定义在第二段，把 `mutation` 定义在第三段，如果不看尤大对于设计思想的讲解，我也一直是在这样做。

但是为什么 Logical Concerns 优于 Vue2 和 React Class Component 的 Option Types？看完 [detailed-design](https://vue-composition-api-rfc.netlify.com/#detailed-design) 这个章节你就全部明白了，并且这会融入到你日常开发中去。

总之，看完这篇以后，我果断的把公司里的首屏组件的一坨代码直接抽成了 n 个自定义 hook，维护效率提升简直像是坐火箭。

当然，社区里的宝藏 issue 肯定不止这些，我只是简单的列出了几个，但就是这几个都让我的技术视野开阔了很多，并且是真正的融入到公司的业务实战中去，是**具有业务价值的**。希望你养成看 issue，紧跟英文社区的习惯，Github issue 里单纯的技术探讨氛围，真的是国内很少有社区可以媲美的。

### Tree Shaking 的 Issue

相学长的文章[你的 Tree-Shaking 并没什么卵用](https://zhuanlan.zhihu.com/p/32831172)中，也详细的描述了他对于**副作用**的一些探寻过程，在[UglifyJS 的 Issue](https://github.com/mishoo/UglifyJS2/issues/1261)中找到了最终的答案，然后贡献给中文社区，这些内容最开始不会在任何中文社区里出现，只有靠你去探寻和发现。


## Vue 推荐学习资料

[新手向：Vue 2.0 的建议学习顺序](https://zhuanlan.zhihu.com/p/23134551)

[awesome-vue](https://github.com/vuejs/awesome-vue)

[vue-patterns](https://github.com/learn-vuejs/vue-patterns)，有用的 Vue 模式、技巧、提示以及有帮助的精选链接

## Vue 原理

[learnVue](https://github.com/answershuto/learnVue)

[剖析 Vue.js 内部运行机制](https://juejin.cn/book/6844733705089449991)

[Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)

[vue 全面解析](https://github.com/HcySunYang/vue-design/tree/elegant)

[vue-analysis](https://github.com/ustbhuangyi/vue-analysis)，黄老师出品

[vue-design](vue-design)，官方人员出品，域名已过期，需要大家自行在仓库内浏览内容。虽然麻烦了点，但是质量绝对过关

[Vue技术内幕](http://caibaojian.com/vue-design/)

[vue组件间通信六种方式（完整版）](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247484294&idx=1&sn=e12dd5aee63cf9b1faa913c14dc64524&chksm=fa2be36fcd5c6a79ec1902933b75f1234c3fca9f757cfa43b13b5213a78284a48ea1130c620a&scene=126&&sessionid=1664420297#rd)

[详解vue组件三大核心概念](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247484304&idx=1&sn=78b5158232ee4bf2158f83ff765e9e18&chksm=fa2be379cd5c6a6f7d88a27354e037fba86891b781701ef09166517a3a345eed7aa1f65eab4d&scene=126&&sessionid=1664420297#rd)

[【前端词典】学习 Vue 源码的必要知识储备](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247484309&idx=1&sn=c1f08ae69804f78a7246431f7cbc0c93&chksm=fa2be37ccd5c6a6a60cc37113b6e1bd8a521dc9d3eec69c740e8d1b7527ff85ac6c5d3613e96&scene=126&&sessionid=1664420297#rd)

[Vue3.0核心算法被重写了一遍？ 进度虽慢了，但绝对值得!](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247484327&idx=1&sn=178d1086a85f7d46baaa11dea70c9ed7&chksm=fa2be34ecd5c6a58991c3595316ba0d1cc338d61204f7fdd3df3921f4b610ed887fdb6df2a98&scene=126&&sessionid=1664420296#rd)

[Vue 使用中的小技巧](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247484400&idx=1&sn=8058982196f914fff133e449145904d1&chksm=fa2be319cd5c6a0f83e02a31f31a2f9815641560ae860ad9900593c6720529d36e862950d9f5&scene=126&&sessionid=1664420295#rd)

[教你一步步封装 Vue 组件并发布到 npm](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247485189&idx=1&sn=bf4bd6e2131cac0dfcb837e1a241bdbf&chksm=fa2be7eccd5c6efad1a90a0d6881e0990d4d652d1eec9c562a383222ed6aca0d6e7f24b6e949&scene=126&&sessionid=1664420283#rd)

[总结 Vue 知识体系中的十个实用技巧](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247485241&idx=1&sn=ab9417cfcbf93673feec72696f111cbe&chksm=fa2be7d0cd5c6ec62e556c04c19822836456e87a00d0f72c64a85163cd967b097573231b6026&scene=126&&sessionid=1664420282#rd)

[Vue3.0 Beta 直播里到底讲了些啥](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247485403&idx=1&sn=d8af7489e53b8b15e43780c41df6352a&chksm=fa2be732cd5c6e2483189e766db4d0f909426c6b48787be5797106942c28c7aacc7a28e0e682&scene=126&&sessionid=1664420280#rd)

[通过10个实例小练习，快速入门熟练 Vue3 核心新特性](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247485675&idx=1&sn=b0d26738027163bd130ffe3b9c9b0318&chksm=fa2be802cd5c611472cab3d4d29cb9b951ae53838e79875dbd8f337d5f3349c68b86b7e42f02&scene=126&&sessionid=1664420278#rd)

[我的前端知识体系构建（上）](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247486291&idx=2&sn=8d85c5fc90a6867655c4f1fcaad97f55&chksm=fa2bebbacd5c62acaa68cdbe22a5f5fd23fea7f12f39e2145472bbaa0748aead2b99b872492b&scene=126&&sessionid=1664420275#rd)

[学习下尤雨溪是如何巧用源码中的细节？](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247486356&idx=1&sn=b44d5797cb6e4695a2b7a0bca1b2355f&chksm=fa2beb7dcd5c626b943ed5b3542fefa32a07436c04569a821fa0657f282731f6c0aad6f31ccf&scene=126&&sessionid=1664420274#rd)

[摸鱼的新发现，滚动条无限滚动](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247486520&idx=2&sn=87cbfb57d028c21b29729446f734208b&chksm=fa2becd1cd5c65c7288ed9ccde0d07ba786df7d6801387d1178ffa2a7dae287b929c7b41a302&scene=126&&sessionid=1664420274#rd)

[我居然把 Vue3 的原理用到了 React 上？](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247486541&idx=1&sn=fa95f03f4ea9c36cb601036e472dbe90&chksm=fa2beca4cd5c65b2f5a3b90604af822c310386c91c45f5c8c90ac34193b392077a334eb1d4e3&scene=126&&sessionid=1664420273#rd)

[使用Vue3.0，我收获了哪些知识点](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247486589&idx=2&sn=32acfcf176c321b56bac704ec67a1b6e&chksm=fa2bec94cd5c6582add581d723e0ffc487a1e9835655e17c0c58ed3a08227904cdc742b3b083&scene=126&&sessionid=1664420273#rd)

[陪尤雨溪一起，实现 Vuex 无限层级类型推断。（TS 4.1 新特性）](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247486611&idx=2&sn=bb9ee70dd6716320cff01c7041848211&chksm=fa2bec7acd5c656c80b868a289423be2f4680b373e196827c9c26df2ed67c60bec3118e14322&scene=126&&sessionid=1664420273#rd)

[「ssh 回忆」面了几个说自己精通 Vue 的同学](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247487436&idx=1&sn=f01e8673bf88fe79e3f693555e7d7e24&chksm=fa2bef25cd5c6633608534cb070a9c5463ff0dccdde241256fdf5ba16e028b27ae2edc076301&scene=126&&sessionid=1664420260#rd)

[自己设计的Vue3的实用项目（内含对项目亮点的实现思路与介绍）](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247487458&idx=2&sn=b27608d5b6d189a53f6bd7256f688d74&chksm=fa2bef0bcd5c661dda10bd21bfebc21161c791031e564610e64ccd745651bc65328c1f73670b&scene=126&&sessionid=1664420260#rd)

[Vue3 的学习教程汇总、源码解释项目、支持的 UI 组件库、优质实战项目](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247487773&idx=1&sn=7b573eaa22035b20aa90a7b3c2c4e2b4&chksm=fa2bf1f4cd5c78e29b471bc97b3c552b61806352e715ea4d7c50f7730676eec264883a14a4ee&scene=126&&sessionid=1664420259#rd)

[揭秘 Vue.js 九个性能优化技巧（黄轶老师写的真的好，不看吃亏）](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247487891&idx=1&sn=7bcab4391897090317afcd4436dc8a44&chksm=fa2bf17acd5c786caf1382d5553419ef63a8e890359708021cf2999845dc69d03c64c0724f80&scene=126&&sessionid=1664420258#rd)

[和女朋友争论了1个小时，在Vue里用Throttle居然这么黑盒？](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247487863&idx=1&sn=1a9136bbbd31c4fa76a6c3e8c2509d5e&chksm=fa2bf19ecd5c788897116a183eb1bcfad9e2e21dc5a5e4362fb1419fbee81d22deac99a4d45b&scene=126&&sessionid=1664420258#rd)

[【阮一峰推荐】学习源码的利器](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247488086&idx=1&sn=d57ed4403ddeb3ce2941b2ad1c26c5fe&chksm=fa2bf2bfcd5c7ba91df28300726867f3a8bd6de57c15cec78308ff846839a35dcc9d9b1f9e56&scene=126&&sessionid=1664519638#rd)

[刨根问底，揭开 Vue 中 Scope CSS 实现的幕后（原理）](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247488311&idx=2&sn=e1eec4b167f5d71500548c98a8b800c3&chksm=fa2bf3decd5c7ac8760fd52d9f42fcfe6291ba7452ed175499b414bbf9d25dd287fe42303f92&scene=126&&sessionid=1664519634#rd)

[Vue 3 大优化：提速一倍不大行，这次整两倍！](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247489918&idx=1&sn=1e63f02cc5224c2fe8280038a07aa7dc&chksm=fa2bf997cd5c708103a4a4df50fe9f44835751c101214defc2e0596fc204ac26157b0f2c772a&scene=126&&sessionid=1664519614#rd)

[是什么事让尤大如此生气？](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247490094&idx=1&sn=2edc85f8e1c75351302a1c1645303e60&chksm=fa2bfac7cd5c73d1823ee9947ca204de6e451b7e4fd2fd6a619c430d3ee65d5350b5c3edf9ba&scene=126&&sessionid=1664519610#rd)

[如何从零到一成为尤雨溪推荐的组件库的贡献者？](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247490092&idx=1&sn=33a57a87f641690ffbe9127b7c096694&chksm=fa2bfac5cd5c73d3baafc6dfac99b2411f0b8af9e3887fcbb8e8f7f86f4567cadf314fff3d48&scene=126&&sessionid=1664519610#rd)