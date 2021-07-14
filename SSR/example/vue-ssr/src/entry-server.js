import createApp from "./main"

// 服务器端，用于首屏渲染（方法参数为浏览器请求服务时的上下文）
// context 由 render 传入
export default (context) => {
  return new Promise((resolve, reject) => {
    // 获取路由和 APP 实例
    const { app, router, store } = createApp(context)
    // 获取跳转首屏地址（客户端请求地址）
    router.push(context.url)
    router.onReady(() => {
      // 路由跳转完成，返回结果之前
      const matched = router.getMatchedComponents() // 获取当前匹配的所有组件
      if (!matched.length) { // 404
        return reject({code: 404})
      }
      // 遍历，查看每个组件中是否有 asyncData；如果有执行
      Promise.all(
        matched.map(comp => {
          if (comp.asyncData) {
            return comp.asyncData({
              store,
              route: router.currentRoute
            })
          }
        })
      ).then(() => {
        // 【约定】，将 app 数据状态放入 context.state 中
        // 渲染器会将 state 序列化变为字符串
        // 后面再前端激活之前再恢复
        // 猜想：在 vuex actions 中异步获取的数据存放在 vuex 中，当所有 js 返回到客户端时，
        // 存储的数据会被清空，需要持久化保存（方式如下）
        context.state = store.state
        resolve(app)
      }).catch(err => {
        console.log(err)
      })
      // resolve(app)
    }, reject)
  })
}

// ？为什么要返回一个 promise
// 上面只是进行了跳转，还可能在获取服务数据的操作，需要异步等待
