'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  // 为取消请求准备一个 promise 对象，并保存 resolve 函数
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  // 保存当前 token对象 === new CancelToken() 的实例
  var token = this;
  // 立即执行接收的执行器函数，并传入用于取消请求的 cancel 函数
  executor(function cancel(message) {
    // 如果 token 中有 reason 了，说明请求已经取消
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }
    // 将 token 中的 reason 指定为一个 Cancel 对象
    token.reason = new Cancel(message);
    // 将取消请求的 promise 指定为成功，值为 reason
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;
