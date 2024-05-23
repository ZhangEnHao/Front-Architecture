/** @type {import('webpack').Configuration} */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = {
  entry: {
    index: path.join(__dirname, "../", "src/index.js"),
  },
  output: {
    filename: "js/[name]_[chunkhash:8].bundle.js",
    path: path.resolve(__dirname, "../", "dist"),
    chunkFilename: "js/[name]_[chunkhash:8].bundle.js", // 设置按需加载后的chunk名字
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  resolve: {
    extensions: [".js"],
    alias: {
      // 配置别名
      "@": path.resolve(__dirname, "../", "src"),
    },
    modules: [path.resolve(__dirname, "../node_modules")],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/i,
        include: [path.resolve(__dirname, "src")],
        use: [
          {
            loader: "thread-loader",
            options: {
              workder: 3,
            },
          },
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          "eslint-loader",
        ],
        generator: {
          filename: path.resolve(__dirname, "../", "dist/js"),
        },
      },
    ],
  },
  plugins: [
    new StylelintPlugin({
      files: ["src/**/.{css, less}"],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]_[contenthash:8].css",
    }),
    new FriendlyErrorsWebpackPlugin(),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
  ],
};
