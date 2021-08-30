'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * 创建一个 Axios 实例
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 * 
 * axios 与 Axios 的关系：
 * 1. 从语法上来说，axios 不是 Axios 的实例。axios 是 Axios.prototype.request函
 * 数 bind() 返回的函数
 * 2. 从功能上来说，axios 是 Axios 的实例。axios 作为对象有 Axios 原型对象上的所有
 * 方法，有 Axios 对象上的所有属性
 */
function createInstance(defaultConfig) {
  /**
   * 创建 Axios 实例
   *    原型对象上有用来发送请求的方法：get() / post() / put() / delete() / request()
   *    自身有两个重要属性：defaults / interceptors
   * */ 
  var context = new Axios(defaultConfig);

  /**
   * Axios.prototype.request.bind(context)
   * axios 和 axios.create() 对应的就是 request 函数
   * bind 返回一个函数实例(这里是 wrap 方法)
   * 修改 Axios.prototype.request 的 this 指向为 context
   * 执行 axios(config) 相当于执行 Axios.prototype.request(config)
   * */ 
  var instance = bind(Axios.prototype.request, context);

  /**
   * 将 Axios 原型对象上的所有方法（get() / post() / put() / delete() / request()等 8 个方法）
   * 复制到 instance 上
   * context 作为 bind 的作用域
   * */ 
  utils.extend(instance, Axios.prototype, context);

  // 将 Axios 实例对象上的所有属性（defaults / interceptors）复制到 instance 上
  utils.extend(instance, context);

  return instance;
}

// 创建要导出的默认实例
var axios = createInstance(defaults);

// 暴露 Axios 类以允许类继承
axios.Axios = Axios;

// Factory for creating new instances
/**
 * axios.create 创建的 instance 与 axios 的区别
 * 相同点：
 *    1. 都是一个可以发送任意请求的函数 Axios.prototype.request(config)
 *    2. 都有发送特定请求的各种方法 get() / post() / put() / delete() / request()
 *    3. 都有默认配置和拦截器属性 defaults / interceptors
 * 不同点：
 *    1. 默认匹配的值可能不一样
 *    2. instance 没有 axios 后面添加的一些方法 
 *        create() / Cancel() / CancelToken()
 *        / isCancel() / all() / spread() / isAxiosError()
 * 
 * */ 
// 暴露创建 Axios 实例的工厂方法 【工厂模式】
axios.create = function create(instanceConfig) {
  // mergeConfig: 将用户传入的配置与默认配置进行合并
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// 暴露取消 request 相关的方法
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// 暴露 all/spread (处理并发请求的助手函数)
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// 暴露 isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// 允许在 TypeScript 中使用默认导入语法
module.exports.default = axios;
