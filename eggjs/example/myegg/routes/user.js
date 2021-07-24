module.exports = {
  // 子路由
  // /user/

  // 添加 service 做如下处理
  // 中间件 =》 业务方法 app  重新构造中间件（原本的 ctx 变为了 app） 然后 执行方法
  // app 上绑定上下文
  'get /': async app => {
    // 调用 service
    const name = await app.$services.user.getName()
    app.ctx.body = name
  },
  'get /info': async app => {
    app.ctx.body = '年龄' + app.$services.user.getAge()
  }
}

