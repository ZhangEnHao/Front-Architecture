const path = require('path');
const { merge } = require('webpack-merge');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = require('./webpack.prod');

function setMpa() {
  const entry = {};
  const htmlWebpackPlugins = [];

  const pagePaths = glob.sync(path.join(__dirname, '../src/mpa/**/index.js'));

  pagePaths.forEach((pagePath) => {
    const name = pagePath.match(/src\/mpa\/(.*)\/index\.js/)[1];

    entry[name] = pagePath;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        chunks: [name],
        template: path.join(__dirname, '../', `src/mpa/${name}/index.html`),
      }),
    );

    return name;
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
}

const { entry, htmlWebpackPlugins } = setMpa();

module.exports = merge(prod, {
  entry: {
    ...entry,
  },
  plugins: htmlWebpackPlugins,
});
