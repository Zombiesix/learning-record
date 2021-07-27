// 中间件的工厂函数
module.exports = (option, app) => {
  return async function(ctx, next) {
    try {
      // 业务逻辑
      await next()
    } catch(err) {
      // 异常处理
      // eggjs 中有收集异常的功能，交给 eggjs 处理
      app.emit('error', err, this)

      // 统一异常应答
      const status = err.status || 500
      // 区分
      const error = status === 500 && 
        app.config.env === 'prod' ? 'Internal Server Error' : err.message
      ctx.body = {
        code: status,
        error: error
      }
      if (status === 422) {
        ctx.body.detail = err.errors
      }

      ctx.status = 200 // 返回的都是 200，真正的错误通过 message 提示
    }
    
  }
}
