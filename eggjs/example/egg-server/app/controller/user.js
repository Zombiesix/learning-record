const Controller = require('egg').Controller

/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账号/密码/类型
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this

    // 测试 error_handler 异常，执行 /api/user 接口时会触发并打印出下面的异常
    // ab()

    // // 测试 helper.js
    // const res = {
    //   abc: 123
    // }
    // // 设置响应内容和响应状态码
    // ctx.helper.success({ctx, res})

    // 测试验证 使用 contract 中的规则校验
    // validate 插件
    ctx.validate(ctx.rule.createUserRequest)

    // 组装参数
    const payload = ctx.request.body || {}

    // 调用 Service 进行业务处理
    const res = await service.user.create(payload)

    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
    
    // ctx.body = 'user ctrl5555'
  }
}

module.exports = UserController
