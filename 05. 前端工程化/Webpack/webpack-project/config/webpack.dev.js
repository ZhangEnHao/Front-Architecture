/** @type {import('webpack').Configuration} */
const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  target: "web",
  devServer: {
    static: path.join(__dirname, "../dist"),
    historyApiFallback: true,
    open: true,
    compress: true,
    // 在 server 脚本使用 publicPath，以确保文件资源能够正确地 serve 在 http://localhost:3000 下
    // publicPath: "/",
  },
  cache: {
    type: "memory",
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/i,
        include: [path.resolve(__dirname, "src")],
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [
                  require("autoprefixer")({
                    overrideBrowserslist: [
                      "> 1%",
                      "last 2 versions",
                      "not ie <= 10",
                    ],
                  }),
                ];
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)$/,
        type: "asset",
        include: [path.resolve(__dirname, "src")],
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../", "public/index.html"),
      title: "webpack-project",
      favicon: path.join(__dirname, "../", "public/favicon.svg"),
      chunks: ["index"],
    }),
  ],
});
