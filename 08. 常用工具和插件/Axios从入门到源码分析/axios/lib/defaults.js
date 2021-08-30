'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');
var enhanceError = require('./core/enhanceError');

// 默认 Content-Type
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

// 如果 headers 中 Content-Type 不存在，则设置其值
function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

// 不同环境下，获取默认的适配器
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  // 得到当前环境对应的请求适配器
  adapter: getDefaultAdapter(),

  // 请求转换器
  transformRequest: [function transformRequest(data, headers) {
    // 指定 headers 中更规范的请求头属性名
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    // 如果是以下几种格式, 则直接返回
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    // 如果是 URLSearchParams 对象, 设置 Content-Type
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    /**
     * 如果 data 是对象，指定请求体参数格式为 json ，并将参数数据对象转换为 json
     * */ 
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return JSON.stringify(data);
    }
    return data;
  }],

  // 响应数据转换器：解析字符串类型的 data 数据
  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   * 设置请求超时时间, 默认为 0. 超时将终止请求, 0 意味着没有超时
   */
  timeout: 0,

  // CSRF/XSRF (跨站请求伪造)
  // `xsrfCookieName` 是要用作 xsrf 令牌的值的 cookie 的名称
  // `xsrfHeaderName` 是携带 xsrf 令牌值的 http 头的名称
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  // 定义允许的响应内容的最大尺寸
  maxContentLength: -1,
  maxBodyLength: -1,

  // 判断响应状态码的合法性：[200, 300)
  // 验证请求状态
  // `validateStatus` 定义对于给定的 HTTP 响应状态码是 resolve 或 reject 的 promise 。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`),
  // promise 将被 resolve; 否则, promise 将被 reject
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  // 通用的 HTTP 字段
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

// 指定 delete / get / head 请求方式的请求头容器对象
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

// 指定 post / put / patch 请求方式的请求头容器对象
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;
