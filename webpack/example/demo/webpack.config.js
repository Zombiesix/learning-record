const path = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
const minicssextractplugin = require('mini-css-extract-plugin')

// const { cleanwebpackplugin } = require('clean-webpack-plugin')

module.exports = {
  // spa（单入口）、mpa（多入口）
  // entry: "./src/index.js", // 执行时会转成下面对象格式
  // 多入口打包会生成多个 chunk，所以输出 failname 不能固定，否则报错打包文件名相同
  entry: {
    main: "./src/index.js",
    login: "./src/login.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js" // 中括号，占位符，打包出来的文件名叫什么；eg：entry 中的 key；默认的 key 为 main
  },
  mode: "development",

  // 插件
  // htmlwebpackplugin 自动生成 html 文件，引入 bundle 文件，压缩文件...
  plugins: [
    new htmlwebpackplugin({ // index
      template: "./public/index.html", // 指定模板文件
      filename: "index.html", // 生成的文件名
      chunks: ["main"] // 指定引入的 chunk
    }),
    new htmlwebpackplugin({ // login
      template: "./public/index.html",
      filename: "login.html",
      chunks: ["login"]
    }),
    new minicssextractplugin({
      filename: "style/index.css"
    })
  ],

  // 模块
  module: {
    rules: [
      {
        test: /\.css$/,
        // 存在顺序问题，执行顺序为从右到左
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        // 存在顺序问题，执行顺序为从右到左
        use: [
          // "style-loader",
          minicssextractplugin.loader,
          {
            loader: "css-loader",
            // options: {
            //   modules: true
            // }
          },
          "postcss-loader",
          "less-loader"
        ]
      },
      // 自定义 loader
      {
        test: /\.js$/,
        // use: path.resolve(__dirname, "./myLoader/def-loader.js")
        use: {
          loader: path.resolve(__dirname, "./myLoader/def-loader.js"),
          // 自定义 loader 传参
          options: {
            name: 'tony'
          }
        }
      }
    ]
  }
}
