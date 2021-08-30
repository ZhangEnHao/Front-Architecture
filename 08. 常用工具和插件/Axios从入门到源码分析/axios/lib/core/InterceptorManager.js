'use strict';

var utils = require('./../utils');

/**
 * 声明一个拦截器管理的类
 */
function InterceptorManager() {
  // 存放拦截器方法，数组内每一项都是有两个属性的对象，两个属性分别对应成功和失败后执行的函数。
  this.handlers = [];
}

/**
 * 添加一个拦截器
 *
 * @param {Function} fulfilled 成功的回调
 * @param {Function} rejected 失败的回调
 * @return {Number} 返回添加的拦截器的下标, 用于以后删除
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * 删除一个拦截器
 *
 * @param {Number} id 通过 use 方法返回的 id
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * 遍历所有非 null 的 handler, 并调用
 *
 * @param {Function} fn 调用每个拦截器的函数
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;
