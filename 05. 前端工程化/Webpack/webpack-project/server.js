const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const config = require("./config/webpack.dev");
const compiler = webpack({
  ...config,
  output: {
    filename: "[name]_[chunkhash:8].bundle.js",
    path: path.resolve(__dirname, "../", "dist"),
    clean: true,
    publicPath: "/",
  },
  devServer: {
    //托管静态资源文件
    static: path.join(__dirname, "../dist"),
    // 当使用 [HTML5 History API] 时，任意的 `404` 响应被替代为 `index.html`
    historyApiFallback: true,
    //编译完自动打开浏览器
    open: true,
    //开启gzip压缩
    compress: true,
    // 在 server 脚本使用 publicPath，以确保文件资源能够正确地 serve 在 http://localhost:3000 下
    publicPath: "/",
  },
});

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// 将文件 serve 到 port 3000。
app.listen(3000, function () {
  console.log("server is running on port 3000");
});
