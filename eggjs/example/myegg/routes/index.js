// 高阶函数 =》 高阶函数工厂
module.exports = app => ({
  'get /': app.$ctrl.home.index,
  'get /detail': app.$ctrl.home.detail
})
