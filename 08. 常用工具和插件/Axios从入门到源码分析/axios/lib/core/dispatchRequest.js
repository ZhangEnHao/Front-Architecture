'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * 如果请求已取消，则抛出“取消”。
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * 转换请求数据 ==> 调用  函数发送请求 ==> 请求返回后转换响应数据，返回 promise
 * 使用配置的适配器向服务器发送请求。
 *
 * @param {object} config 用于请求的配置
 * @returns {Promise} 返回 fulfilled(已成功) 状态的 Promise
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // 确保 headers 存在
  config.headers = config.headers || {};

  /**
   * 对 config 中的 data 进行必要的转换处理
   * 设置相应的 Content-Type 请求头
  */
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // 整合 config 中所有的 headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  // 删除 headers 中的 method
  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  // 适配器
  var adapter = config.adapter || defaults.adapter;

  // 使用适配器发起请求
  return adapter(config).then(function onAdapterResolution(response) {
    // 请求成功
    throwIfCancellationRequested(config);

    /**
     * 对 response 中还没有解析的 data 数据进行解析
     * json 字符串解析为 js 对象或数组
    */
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    // 返回响应数据
    return response;
  }, function onAdapterRejection(reason) {
    // 请求失败
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // 如果请求错误且有数据
      // 转换响应数据
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    // 返回错误信息，通过 catch 捕获
    return Promise.reject(reason);
  });
};
