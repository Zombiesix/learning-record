const { Service } = require('egg')

class UserService extends Service {
  async getAll() {
    // return {
    //   name: 'service'
    // }

    // 调用模型
    return await this.ctx.model.User.findAll();
  }
}

module.exports = UserService
