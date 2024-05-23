const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const glob = require("glob");
const PurgecssPlugin = require("purgecss-webpack-plugin");

const common = require("./webpack.common");
const prod = require("./webpack.prod");

const unit = process.argv[process.argv.length - 1];

// console.log("unit ===", unit);
console.log(path.join(__dirname, "../", `src/mobile/${unit}/index.js`));

module.exports = merge(
  {
    ...common,
    entry: {
      [unit]: path.join(__dirname, "../", `src/mobile/${unit}/index.js`),
    },
  },
  {
    ...prod,
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "../", `src/mobile/${unit}/index.html`),
        title: `${unit}-webpack-project`,
        favicon: path.join(__dirname, "../", "public/favicon.svg"),
        chunks: [unit],
      }),
      new PurgecssPlugin({
        paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, {
          nodir: true,
        }),
      }),
    ],
    optimization: {
      moduleIds: "deterministic",
      minimize: true,
      minimizer: [new CssMinimizerPlugin({}), "..."],
      splitChunks: {
        chunks: "all",
      },
    },
  }
);
