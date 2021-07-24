// const app = new (require('koa'))()
// 加载路由
// const { initRouter } = require('./kkb-loader')
// app.use(initRouter().routes())

// app.listen(3000, () => {
//   console.log('服务启动在3000端口...');
// })

// 封装 优化
const kkb = require('./kkb')
const app = new kkb()
app.start(3000)
