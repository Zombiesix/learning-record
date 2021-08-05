// 原材料
const webpack = require("webpack")

// 配置文件
const config = require("./webpack.config.js")

// 按配置文件（配方）进行生产；生成 compiler（其中包含配置文件 webpack.config.js 信息）
const compiler = webpack(config)

Object.keys(compiler.hooks).forEach(hookName => {
  // 为钩子注册事件
  compiler.hooks[hookName].tap("xxx", (compilation) => {
    console.log("run----------", hookName);
  })
})

compiler.run();
