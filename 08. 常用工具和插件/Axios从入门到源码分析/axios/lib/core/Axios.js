'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');
var validator = require('../helpers/validator');

var validators = validator.validators;
/**
 * Axios 构造函数
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  // 将指定的 config 保存为 defaults 属性
  this.defaults = instanceConfig;
  // 将包含请求 / 响应拦截器管理器的对象保存为 interceptors 属性
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * 用于发送请求的函数
 * 使用的 axios 就是此函数 bind() 返回的函数
 * 
 * 将配置进行合并
 * defaults: Axios 默认配置
 * {method: 'get'}: 默认是 get 方法
 * this.defaults: Axios 构造器中的配置属性
 * config: 用户传入的配置
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  // 合并配置
  config = mergeConfig(this.defaults, config);

  // 添加 method 配置 默认为 get
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  // 后添加的请求拦截器保存在数组前面
  // 将 request 拦截器逐一插入到 链表的头部
  // 注：这里的 forEach 是 InterceptorManager.prototype.forEach
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  // 后添加的响应拦截器保存在数组后面
  // 将 response 拦截器逐一插入到 链表的尾部
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    /**
     * 创建用于保存请求 / 响应拦截器函数的数组
     * 数组的中间放发送请求的函数
     * 数组的左边放请求拦截器函数（成功 / 失败）
     * 数组的右边放响应拦截器函数
     * */ 
    // 连接拦截器中间件
    // undefined: 后面需要两两取出, 用于占位
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain.concat(responseInterceptorChain);

    // 将 config 转换为 promise, 同时后续 config 将作为参数进行传递
    promise = Promise.resolve(config);

    // 通过上面的步骤, 我们就形成了如下链表：
    // request 拦截器(interceptors.request) + 发起请求的方法(dispatchRequest) + response 拦截器(interceptors.response)
    // 通过 promise.then() 串联起所有的请求拦截器 / 请求方法 / 响应拦截器
    while (chain.length) {
      // 从链表中从头连续取出2个元素，第一个作为 promise 的 resolve handler， 第二个作为 reject handler
      promise = promise.then(chain.shift(), chain.shift());
    }
    // 返回 promise
    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

// 用来得到带 query 参数的 url
Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// 提供支持的请求方法的别名
// 注意这四个方法都不需要 请求负载（request payload）
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    // this.request: 调用 Axios.prototype.request
    // 将参数合并为一个, config 非必填
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

// 注意这四个方法都有 请求负载（request payload）
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    // this.request: 调用 Axios.prototype.request
    // 将参数合并为一个, config 非必填
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;
