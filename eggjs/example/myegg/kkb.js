const koa = require('koa')
const { initRouter, initController, initService, loadConfig, initSchedule } = require('./kkb-loader')

class kkb {
  constructor(conf) {
    this.$app = new koa(conf) // 实例化
    loadConfig(this)

    this.$services = initService(this)
    this.$ctrl = initController(this) // 初始化控制器，返回所有控制器
    this.$router = initRouter(this) // 初始化路由 + 将控制器传入（url路径即可匹配到指定的控制器）
    this.$app.use(this.$router.routes()) // 注册路由

    initSchedule() // 定时任务
  }

  start(port) {
    this.$app.listen(port, () => {
      console.log(`KKB start at ${port}...`);
    })
  }
}

module.exports = kkb
