const path = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const kkbwebpackplugin = require("./myPlugins/kkb-webpack-plugin")

module.exports = {

  mode: 'development',

  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  },

  plugins: [
    new CleanWebpackPlugin(),
    new htmlwebpackplugin({
      template: "./public/index.html",
      filename: 'index.html',
      chunks: ['main']
    }),
    new kkbwebpackplugin({
      name: "kkb plugin"
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        // use: ["file-loader"]
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]", // 保持原有文件名、格式不变
              outputPath: "assert", // 文件夹目录 资源的存储位置
              // 如果没有设置 publicPath，最后的路径是 outputPath + name
              // publicPath: "../"  // 资料的使用地址，打包时会加上，最后打包后的路径是：publicPath + name
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: [
          //     [
          //       "@babel/preset-env", {
          //         targets: {
          //           edge: "17"
          //         },
          //         corejs: 2,
          //         useBuiltIns: "usage"
          //       }
          //     ]
          //   ]
          // }
        }
      },
      {
        test: /\.md$/,
        use: "./def-loader/md-loader/index.js"
      }
    ]
  }
}
