/** @type {import('webpack').Configuration} */
const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const glob = require("glob");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// 在 webpack5 中可以得到构建各个阶段的处理过程、耗费时间以及缓存使用的情况。

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  stats: "errors-only",
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/i,
        include: [path.resolve(__dirname, "src")],
        use: [
          {
            loader: "thread-loader",
            options: {
              workder: 3,
            },
          },
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
            maxSize: 10 * 1024,
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
      minify: {
        html5: true,
        collapseWhitespace: true, // 是否折叠空白
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
        removeAttributeQuotes: false, // 是否删除属性的双引号
      },
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, {
        nodir: true,
      }),
    }),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    moduleIds: "deterministic",
    minimize: true,
    minimizer: [new CssMinimizerPlugin({}), "..."],
    splitChunks: {
      chunks: "all",
    },
  },
});
