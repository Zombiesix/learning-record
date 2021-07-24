// 加入 service 时做如下：
// json => 工厂
module.exports = app => ({
  index: async ctx => {
    // ctx.body = '首页Ctrl'
    app.ctx.body = 'ctrl ' + await app.$services.user.getName()
  },
  detail: async ctx => {
    app.ctx.body = '详情Ctrl'
  }
})
