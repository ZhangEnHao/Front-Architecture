[Promise 的源码实现（完美符合 Promise/A+规范）](https://juejin.cn/post/6844903796129136654)

## Promise/A+ 规范

在编写 `Promise` 之前，必须了解 Promise/A+ 规范。由于内容较长，下面总结了几点，更详细的内容可以查阅 [Promise/A+ 规范](https://promisesaplus.com/)。

`Promise` 是一个对象或者函数，对外提供了一个 `then` 函数，内部拥有 3 个状态。

### `then` 函数

`then` 函数接收两个函数作为可选参数：

```javaScript
promise.then(onFulfilled, onRejected)
```

同时遵循下面几个规则：

- 如果可选参数不为函数时应该被忽略；

- 两个函数都应该是异步执行的，即放入事件队列等待下一轮 `tick`，而非立即执行；

- 当调用 `onFulfilled` 函数时，会将当前 `Promise` 的值作为参数传入；

- 当调用 `onRejected` 函数时，会将当前 `Promise` 的失败原因作为参数传入；

- `then` 函数的返回值为 `Promise`。

### `Promise` 状态

`Promise` 的 3 个状态分别为 `pending`、`fulfilled` 和 `rejected`。

- `pending`：“等待”状态，可以转移到 `fulfilled` 或者 `rejected` 状态

- `fulfilled`：“执行”（或“履行”）状态，是 `Promise` 的最终态，表示执行成功，该状态下不可再改变。

- `rejected`：“拒绝”状态，是 `Promise` 的最终态，表示执行失败，该状态不可再改变。

## `Promise` 解决过程

`Promise` 解决过程是一个抽象的操作，即接收一个 `promise` 和一个值 `x`，目的就是对 `Promise` 形式的执行结果进行统一处理。需要考虑以下 4 种情况。

**情况 1： `x` 等于 `promise`**

抛出一个 `TypeError` 错误，拒绝 `promise`。其中 `x` 可以简单地理解为 `Promise` 执行成功的返回值。

**情况 2：`x` 为 `Promise` 的实例**

如果 `x` 处于等待状态，那么 `promise` 继续等待至 `x` 执行或拒绝，否则根据 `x` 的状态执行/拒绝 `promise`。

**情况 3：`x` 为对象或函数**

该情况的核心是取出 `x.then` 并调用，在调用的时候将 `this` 指向 `x`。将 `then` 回调函数中得到结果 `y` 传入新的 `Promise` 解决过程中，形成一个递归调用。其中，如果执行报错，则以对应的错误为原因拒绝 `promise`。

这一步是处理拥有 `then()` 函数的对象或函数，这类对象或函数称之为“thenable”。注意，它只是拥有 `then()` 函数，并不是 `Promise` 实例。

**情况 4：如果 `x` 不为对象或函数**

以 `x` 作为值，执行 `promise`。

## `Promise` 测试

为了验证编写的 `Promise` 正确性，引用一个专门用来测试 `Promise` 规范性的模块 [promises-aplus-tests](https://github.com/promises-aplus/promises-tests)，该模块内置了 872 个测试案例，支持命令行一键测试。只是在导出模块的时候需要遵循 CommonJS 规范，并且按照要求导出对应的函数。

首先，在 `promise` 实现的代码中，增加以下代码:

```javaScript
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
```

安装测试脚本:

```shell
npm install -g promises-aplus-tests
```

如果当前的 `promise` 源码的文件名为 `Promise.js`

那么在对应的目录执行以下命令:

```shell
promises-aplus-tests Promise.js
```

即可查看测试信息。
