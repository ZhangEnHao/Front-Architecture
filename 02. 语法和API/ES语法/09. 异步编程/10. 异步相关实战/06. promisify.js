// 通过 promisify 的方法将 callback 语法的 API 改造成 Promise 语法

function promisify(original) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push(function callback(err, ...values) {
        if (err) {
          return reject(err);
        }
        return resolve(...values);
      });
      original.call(this, ...args);
    });
  };
}
