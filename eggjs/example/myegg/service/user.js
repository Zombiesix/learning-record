const delay = (data, tick) => new Promise(resolve => {
  setTimeout(() => {
    resolve(data)
  }, tick)
})

module.exports = app => ({
  getName() {
    // return delay('jerry', 1000)

    // 添加 model 层修改
    return app.$model.user.findAll() // 模型 user.js 使用 define 创建了表，调用 findAll 来查这个表的数据
  },
  getAge() {
    return 20
  }
})
