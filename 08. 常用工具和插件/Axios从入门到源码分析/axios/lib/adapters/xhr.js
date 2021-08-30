'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

/**
 * 浏览器环境下使用的方法
 * 创建 XHR 对象，根据 config 进行相应设置
 * 发送特定请求，并接收响应数据，返回 promise
 * */
module.exports = function xhrAdapter(config) {
  // 返回一个 promise
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    // 如果是 FormData 对象, 删除 headers 中的 Content-Type 字段, 让浏览器自动生成
    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    // 创建 XHR 对象
    var request = new XMLHttpRequest();

    // 配置 HTTP 请求头的 Authentication [HTTP身份验证]
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      // 使用 btoa 创建一个 base-64 编码的字符串
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    // open(请求方法, 请求URL, 是否支持异步): 初始化一个请求
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // 请求的最大请求时间, 超出则终止请求（单位 ms）
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }

      // 准备响应
      // getAllResponseHeaders 返回所有响应头
      // responseText 返回的文本数据
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData, // 响应正文
        status: request.status, // 响应状态
        statusText: request.statusText, // 响应状态的文本信息
        headers: responseHeaders, // 响应头
        config: config,
        request: request
      };

      // 根据响应状态码来确定请求的 promise 的结果状态（成功 / 失败）
      // status >= 200 && status < 300 resolve
      // 否则 reject
      settle(resolve, reject, response);

      // 将请求对象赋空
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // 绑定状态改变的监听
      request.onreadystatechange = function handleLoad() {
        // request 不存在获取请求状态不是4，直接结束
        // 监听 readyState 属性变化, 其值为 4 时表示请求成功
        if (!request || request.readyState !== 4) {
          return;
        }

      // 在请求完成前, status 的值为 0。如果 XMLHttpRequest 出错, 浏览器返回的 status 也为 0。
      // file 协议除外, status 为 0 时也是一个成功的请求
      // responseURL: 返回经过序列化（serialized）的响应 URL
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // 绑定请求中断函数
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // 清除 request
      request = null;
    };

    // 请求出错
    request.onerror = function handleError() {
      // 抛出网络错误
      reject(createError('Network Error', config, null, request));

      // 清除 request
      request = null;
    };

    // // 请求超时
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      // 抛出超时错误
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // 清除 request
      request = null;
    };

    // 增加 xsrf header
    // 仅在标准浏览器环境中运行时才能执行此操作。
    // xsrf header 是用来防御 CSRF 攻击
    if (utils.isStandardBrowserEnv()) {
      // 增加 xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // 将 config 中配置的 requestHeaders, 循环设置到请求头上
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
         // 如果 data 未定义, 移除 Content-Type
          delete requestHeaders[key];
        } else {
          // 如果 data 未定义, 移除 Content-Type
          request.setRequestHeader(key, val);
        }
      });
    }

    // `withCredentials` 表示跨域请求时是否需要使用凭证
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // 如果需要指定 responseType
    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // 绑定下载进度的监听
    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // 绑定上传进度的监听
    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    // 如果配置了 cancelToken
    if (config.cancelToken) {
      // 指定用于中断请求的回调函数
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }
        // 中断请求
        request.abort();
        // 让请求的 promise 失败
        reject(cancel);
        // 清除 request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // 发送请求，指定请求体数据，可能是 null
    request.send(requestData);
  });
};
