function axios({ url, method = "GET", params = {}, data = {} }) {
  return new Promise((resolve, reject) => {
    // 处理 method 参数
    method = method.toUpCase();

    // 处理 query 参数
    let queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    url = `${url}?${queryString}`;

    // 1. 执行异步 ajax 请求
    // 创建 xhr 对象
    const request = new XMLHttpRequest();
    // 打开连接（初始化请求，还没发起请求）
    request.open(method, url, true);

    // 绑定状态改变的监听
    request.onreadystatechange = () => {
      // 如果请求没有完成，直接结束
      if (request.readyState !== 4) {
        return;
      }
      // 如果响应状态码在[200, 300)之间代表成功，否则失败
      const { status, statusText } = request;

      // 2.1 成功执行 resolve()
      if (status >= 200 && status < 300) {
        const response = {
          data: JSON.parse(request.response),
          status,
          statusText,
        };
        resolve(response);
      } else {
        // 2.2 失败执行 reject()
        reject(new Error(`request error is status ${status}`));
      }
    };

    // 发送请求
    switch (method) {
      case "GET":
        request.send();
        break;
      case "POST":
      case "PUT":
      case "DELETE":
        request.setRequestHeader(
          "Content-Type",
          "application/json;charset=utf-8"
        );
        request.send(JSON.stringify(data));
        break;
      default:
    }
  });
}

["get", "post", "put", "delete"].forEach((method) => {
  axios[method] = function (url, options) {
    return axios(Object.assign(options, { method, url }));
  };
});
