const webpack = require('./bin/webpack')

const config =  require('./webpack.config')

// 执行打包
new webpack(config).run()
