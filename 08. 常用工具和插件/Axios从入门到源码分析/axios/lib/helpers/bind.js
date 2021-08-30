'use strict';
// 手写实现一个 bind 方法
module.exports = function bind(fn, thisArg) {
  return function wrap() {
    // 将 arguments 转为数组
    // 注: 这里是否多余？apply 支持 arguments 类数组对象
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    // 执行 fn 并传入作用域和参数
    return fn.apply(thisArg, args);
  };
};
