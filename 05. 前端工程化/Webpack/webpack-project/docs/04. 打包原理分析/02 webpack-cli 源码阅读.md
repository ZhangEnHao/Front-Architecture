## webpack-cli 做的事情

- 引入 `Commander.js`，对命令行进行定制。

- 分析命令行参数，对各个参数进行转换，组成编译配置项。如果是内置参数，则调用 `createCompiler`，主要做的事是想将得到的参数传递给 webpack，生成实例化对象 `compiler`。

- 引用 webpack，根据生成的配置项 `options` 传递给 webpack 对象，进行编译和构建。

## `[node_modules/webpack-cli/lib/webpack-cli.js](./webpack-cli.js)`
