const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

module.exports = class PromiseClass {
  constructor(exectur) {
    exectur(this.resolve, this.reject);
  }

  status = PENDING;
  value = undefined;
  reason = undefined;
  onFulfilled = [];
  onRejected = [];

  resolve = (value) => {
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    this.value = value;
    while (this.onFulfilled.length) this.onFulfilled.shift()();
  };

  reject = (reason) => {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.reason = reason;
    while (this.onRejected.length) this.onRejected.shift()();
  };

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;

    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new PromiseClass((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.status === PENDING) {
        this.onFulfilled.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejected.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => {
        return PromiseClass.resolve(callback()).then(() => value);
      },
      (error) => {
        return PromiseClass.resolve(callback()).then(() => {
          throw error;
        });
      }
    );
  }

  static resolve(param) {
    if (param instanceof PromiseClass) return param;

    return new PromiseClass((resolve, reject) => {
      if (
        param &&
        typeof param === "object" &&
        typeof param.then === "function"
      ) {
        setTimeout(() => {
          param.then(resolve, reject);
        });
      } else {
        resolve(param);
      }
    });
  }

  static reject(reason) {
    return new PromiseClass((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    if (!Array.isArray(promises)) {
      return this.reject(new TypeError("arguments must be an array"));
    }

    return new PromiseClass((resolve, reject) => {
      let index = 0;
      const result = [];
      if (promises.length === 0) {
        resolve(result);
      } else {
        function processValue(i, data) {
          result[i] = data;
          if (++index === promises.length) {
            resolve(result);
          }
        }
        for (let i = 0; i < promises.length; i++) {
          //promises[i] 可能是普通值
          PromiseClass.resolve(promises[i]).then(
            (data) => {
              processValue(i, data);
            },
            (err) => {
              reject(err);
              return;
            }
          );
        }
      }
    });
  }

  static race(promises) {
    if (!Array.isArray(promises)) {
      return this.reject(new TypeError("arguments must be an array"));
    }

    return new PromiseClass((resolve, reject) => {
      if (promises.length === 0) {
        return;
      } else {
        for (let i = 0; i < promises.length; i++) {
          PromiseClass.resolve(promises[i]).then(
            (data) => {
              resolve(data);
              return;
            },
            (err) => {
              reject(err);
              return;
            }
          );
        }
      }
    });
  }

  static allSettled(promises) {
    if (!Array.isArray(promises)) {
      return this.reject(new TypeError("arguments must be an array"));
    }

    if (promises.length === 0) return Promise.resolve([]);

    const _promises = promises.map((item) =>
      item instanceof Promise ? item : Promise.resolve(item)
    );

    return new PromiseClass((resolve, reject) => {
      const result = [];
      let unSettledPromiseCount = _promises.length;

      _promises.forEach((promise, index) => {
        promise.then(
          (value) => {
            result[index] = {
              status: FULFILLED,
              value,
            };

            unSettledPromiseCount -= 1;
            // resolve after all are settled
            if (unSettledPromiseCount === 0) {
              resolve(result);
            }
          },
          (reason) => {
            result[index] = {
              status: REJECTED,
              reason,
            };

            unSettledPromiseCount -= 1;
            // resolve after all are settled
            if (unSettledPromiseCount === 0) {
              resolve(result);
            }
          }
        );
      });
    });
  }

  static any(promises) {
    if (!Array.isArray(promises)) {
      return this.reject(new TypeError("arguments must be an array"));
    }

    return new Promise((resolve, reject) => {
      let length = promises.length;
      // 用于收集所有 reject
      const errors = [];
      // 如果传入的是一个空数组，那么就直接返回 AggregateError
      if (length === 0)
        return reject(new AggregateError("All promises were rejected"));
      promises.forEach((promise) => {
        promise.then(
          (value) => {
            resolve(value);
          },
          (error) => {
            length--;
            errors.push(error);
            if (length === 0) {
              reject(new AggregateError(errors));
            }
          }
        );
      });
    });
  }
};

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle"));
  }
  if (x instanceof PromiseClass) {
    if (x.status === PENDING) {
      x.then(function (v) {
        resolvePromise(promise2, v, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    let thenCalledOrThrow = false; // 只能调用一次
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            reject(r);
          }
        );
      } else {
        if (thenCalledOrThrow) return;
        thenCalledOrThrow = true;
        resolve(x);
      }
    } catch (e) {
      if (thenCalledOrThrow) return;
      thenCalledOrThrow = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

// yarn add -s promises-aplus-tests
PromiseClass.deferred = function () {
  const result = {};
  result.promise = new PromiseClass(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}
