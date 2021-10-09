// Generator自动交回执行权
function run(gen) {
  /**
   * 启动器函数返回一个 Promise
   * 给这个 Promise 对象添加 then 函数
   * 当所有的异步操作执行成功后，执行 onFullfilled 函数
   * 如果有任何失败，就执行 onRejected 函数
   * */
  return new Promise(function (resolve, reject) {
    if (typeof gen == "function") gen = gen();

    // 如果 gen 不是一个迭代器
    if (!gen || typeof gen.next !== "function") return resolve(gen);

    onFulfilled();

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise(ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(
        new TypeError(
          `You may only yield a function, promise but the following object was passed: "${String(
            ret.value
          )}"`
        )
      );
    }
  });
}

// 判断 result.value 是否是 Promise
function isPromise(obj) {
  return "function" == typeof obj.then;
}

//  Thunk 函数
function toPromise(obj) {
  if (isPromise(obj)) return obj;
  if ("function" == typeof obj) return thunkToPromise(obj);
  return obj;
}

/**
 * 转换器函数
 * 
 * 将回调函数包装成一个 Promise，然后统一的添加 then 函数
 * 遵循 error first 原则
 * 这意味着当处理回调函数成功时，第一个参数应该返回 null，表示没有错误原因。
 * 
 * 回调函数的第一个参数，必须是错误对象err原因
 * 执行分成两段，第一段执行完以后，任务所在的上下文环境就已经结束了。
 * 在这以后抛出的错误，原来的上下文环境已经无法捕捉，只能当作参数，传入第二段。
 */
function thunkToPromise(fn) {
  return new Promise(function (resolve, reject) {
    fn(function (err, res) {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

module.exports = run;
