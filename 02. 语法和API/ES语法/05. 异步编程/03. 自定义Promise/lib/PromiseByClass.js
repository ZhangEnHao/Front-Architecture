(function (window) {
  const PENDING = "pending";
  const RESOLVED = "resolved";
  const REJECTED = "rejected";

  class Promise {
    constructor(excutor) {
      const self = this;

      self.status = PENDING;
      // 给每个 promise 对象指定一个存储结果数据的属性
      self.data = undefined;
      // 每个元素的结构：{ onResolved() {}, onRejected() {} }
      self.callbacks = [];

      function resolve(value) {
        if (self.status !== PENDING) return;

        self.status = RESOLVED;
        self.data = value;

        if (self.callbacks.length > 0) {
          setTimeout(function () {
            self.callbacks.forEach(function (callbackObj) {
              callbackObj.onResolved(value);
            });
          });
        }
      }

      function reject(reason) {
        if (self.status !== PENDING) return;

        self.status = REJECTED;
        self.data = reason;

        if (self.callbacks.length > 0) {
          setTimeout(function () {
            self.callbacks.forEach(function (callbackObj) {
              callbackObj.onRejected(reason);
            });
          });
        }
      }

      try {
        excutor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }

    // Promise 原型的 then 方法
    // 指定成功 / 失败 的回调
    // 返回一个新的 Promise
    then(onResolved, onRejected) {
      const self = this;

      // 向后传递成功的 value
      onResolved =
        typeof onResolved === "function" ? onResolved : (value) => value;
      // 指定默认的失败回调，将异常传递下去（异常穿透）
      // 向后传递失败的 reason
      onRejected =
        typeof onRejected === "function"
          ? onRejected
          : (reason) => {
              throw reason;
            };

      // 返回新的 Promise
      return new Promise((resolve, reject) => {
        // 调用指定回调函数处理，根据执行结果，改变返回的 promise 状态
        function handle(callback) {
          /**
           * 1. 如果抛出异常，return 的 promise 失败，reason 就是 error
           * 2. 如果返回的回调函数不是 promise，return 的 promise 就会成功，value 就是返回值
           * 3. 如果返回的回调函数是 promise，return 的 promise 结果就是这个 promise 的结果
           * */
          try {
            const result = callback(self.data);
            if (result instanceof Promise) {
              // 3. 如果返回的回调函数是 promise，return 的 promise 结果就是这个 promise 的结果
              // result.then(value => resolve(value),reason => reject(reason)
              result.then(resolve, reject);
            } else {
              // 2. 如果返回的回调函数不是 promise，return 的 promise 就会成功，value 就是返回值
              resolve(result);
            }
          } catch (error) {
            // 1. 如果抛出异常，return 的 promise 失败，reason 就是 error
            reject(error);
          }
        }

        // 当前状态还是 pending 状态，将回调函数保存起来
        if (self.status === PENDING) {
          self.callbacks.push({
            onResolved() {
              handle(onResolved);
            },
            onRejected() {
              handle(onRejected);
            },
          });
        } else if (self.status === RESOLVED) {
          // 当前状态是 resolved 状态，异步执行 onResolved 并改变让 return 的 promise 状态
          setTimeout(() => {
            handle(onResolved);
          });
        } else {
          // 当前状态是 rejected 状态，异步执行 onRejected 并改变让 return 的 promise 状态
          setTimeout(() => {
            handle(onRejected);
          });
        }
      });
    }

    catch(onRejected) {
      return this.then(undefined, onRejected);
    }

    static resolve = function (value) {
      return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
          value.then(resolve, reject);
        } else {
          resolve(value);
        }
      });
    };

    static reject = function (reason) {
      return new Promise((resolve, reject) => {
        reject(reason);
      });
    };

    static all = function (promises) {
      const values = new Array(promises.length);
      let resolvedCount = 0;

      return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
          Promise.resolve(promise).then(
            (value) => {
              resolvedCount++;
              values[index] = value;

              if (resolvedCount === promises.length) {
                resolve(values);
              }
            },
            (reason) => {
              reject(reason);
            }
          );
        });
      });
    };

    static race = function (promises) {
      return new Promise((resolve, reject) => {
        promises.forEach((promise) => {
          Promise.resolve(promise).then(
            (value) => {
              resolve(value);
            },
            (reason) => {
              reject(reason);
            }
          );
        });
      });
    };

    /**
     * 返回一个 promise 对象，在指定的时间后产生成功结果
     * */
    static resolveDelay = function (value, tiem) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value instanceof Promise) {
            value.then(resolve, reject);
          } else {
            resolve(value);
          }
        }, time);
      });
    };

    /**
     * 返回一个 promise 对象，在指定的时间后产生失败结果
     * */
    static rejectDelay = function (value, tiem) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(reason);
        }, time);
      });
    };
  }

  window.Promise = Promise;
})(window);
