## TypeScript

自从 Vue3 横空出世以来，TypeScript 好像突然就火了。这是一件好事，推动前端去学习强类型语言，开发更加严谨。并且第三方包的 ts 类型支持的加入，让我们甚至很多时候都不再需要打开文档对着 api 撸了。

关于 TypeScript 学习，其实几个月前我还对于这门 JavaScript 的超集一窍不通，经过两三个月的静心学习，我能够去理解一些相对复杂的类型了，

可以说 TypeScript 的学习和学一个库或者学一个框架是完全不同的，

### 入门

1. 除了[TypeScript 官方文档](https://www.typescriptlang.org/docs/)以外，还有一些比较好的中文入门教程。[TypeScript Handbook 入门教程](https://zhongsp.gitbooks.io/typescript-handbook/content/)

2. [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/type-system) 非常高质量的英文入门教学。

3. 工具泛型在日常开发中都非常的常用，必须熟练掌握。[TS 一些工具泛型的使用及其实现](https://zhuanlan.zhihu.com/p/40311981)

4. 视频课程，还是黄轶大佬的，并且这个课程对于单元测试、前端手写框架、以及网络请求原理都非常有帮助。[基于 TypeScript 从零重构 axios](https://coding.imooc.com/class/330.html)

### 进阶

1. [巧用 TypeScript 系列 一共五篇](https://juejin.im/post/5c8a518ee51d455e4d719e2e)这五篇文章里借助非常多的案例，为我们讲解了 ts 的一些高级用法，请务必反复在 ide 里尝试，理解，不懂的概念及时回到文档中补习。

2. TS 进阶非常重要的一点，条件类型，很多泛型推导都需要借助它的力量。[conditional-types-in-typescript](https://mariusschulz.com/blog/conditional-types-in-typescript)

3. 以及上面那个大佬[博客中的所有 TS 文章](https://mariusschulz.com)。

### 实战

1. [TypeScript 参数简化实战](https://juejin.im/post/5e38dd65518825492b509dd6)，涉及到的高级知识点非常多。

- 🎉TypeScript 的高级类型（Advanced Type）

- 🎉Conditional Types (条件类型)

- 🎉Distributive conditional types (分布条件类型)

- 🎉Distributive conditional types (分布条件类型)

- 🎉Mapped types（映射类型）

- 🎉 函数重载

2. [TS 实现智能类型推导的简化版 Vuex](https://juejin.im/post/5e38dd65518825492b509dd6)，实现一个简化版的 Vuex，同样知识点结合满满。

- 🎉TypeScript 的高级类型（[Advanced Type](https://www.typescriptlang.org/docs/handbook/advanced-types.html)）

- 🎉TypeScript 中利用泛型进行反向类型推导。([Generics](https://www.typescriptlang.org/docs/handbook/generics.html))

- 🎉Mapped types（映射类型）

- 🎉Distributive Conditional Types（条件类型分配）

- 🎉TypeScript 中 Infer 的实战应用（[Vue3 源码里 infer 的一个很重要的使用](https://github.com/vuejs/vue-next/blob/985f4c91d9d3f47e1314d230c249b3faf79c6b90/packages/reactivity/src/ref.ts#L89)）

### 刻意训练

它几乎是一门新的语言（在类型世界里来说），需要你花费很大的精力去学好它。

我对于 TypeScript 的学习建议其实就是一个关键词：刻意训练，在过基础概念的时候，不厌其烦的在 vscode 中敲击，理解，思考。在基础概念过完以后去寻找实践文章，比如我上面进阶和实战部分推荐的几篇，继续刻意训练，一定要堆积代码量，学习一门新的语言是不可能靠看文档获得成功的。

我会建立一个仓库，专门记录我遇到的[TypeScript 的有趣代码](https://github.com/sl1673495/typescript-codes)，自己动手敲一遍，并且深入理解。

### 能力分级

其实 TypeScript 的能力也是两级分化的，日常写业务来说，你定义一些 interface，配合 React.FC 这种官方内置的类型也就跑通了，没什么特别难的点。

但是如果是造轮子呢？如果你自己写了一个工具库，并且类型比较复杂，你能保证推导出来吗？亦或者就拿 Vue3 来说，ref 是一个很复杂的嵌套类型，

假如我们这样定义一个值 `const value = ref(ref(2))` ，对于嵌套的 `ref`，Vue3 会做一层**拆包**，也就是说其实 `ref.value` 会是 2，

那么它是如何让 ts 提示出 value 的类型是 number 的呢？

如果你看到源码里的这段代码，你只有基础的话，保证懵逼。

[Vue3 跟着尤雨溪学 TypeScript 之 Ref 类型从零实现](https://juejin.im/post/5e94595c6fb9a03c341daa75)

#### 业务开发人员

如果短期内你对自己的要求是能上手业务，那么你理解 TypeScript 基础的 `interface` 和 `type` 编写和泛型的普通使用（可以理解为类型系统里的函数传参）也已经足够。

#### 框架开发人员

但是长期来看，如果你的目的是能够自己编写一些类型完善的库或框架，或者说你在公司扮演**前端架构师**、**轮子专家**等等角色，经常需要写一些偏底层的库给你的小伙伴们使用，那么你必须深入学习，这样才能做到给你的框架使用用户完美的类型体验。

### 面试题

[力扣面试题](https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md)





## 文档

[TypeScript Handbook](https://zhongsp.gitbooks.io/typescript-handbook/content/)

### 推荐文章

[TypeScript 入门教程](https://ts.xcatliu.com/)

[TypeScript 的另一面：类型编程](https://juejin.cn/post/6989796543880495135)

[深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)

### 推荐开源项目

[TypeScript-for-Beginner-Programmers](https://github.com/chibicode/TypeScript-for-Beginner-Programmers)

[type-challenges](https://github.com/type-challenges/type-challenges)

[TypeScript exercises](https://github.com/typescript-exercises/typescript-exercises)
