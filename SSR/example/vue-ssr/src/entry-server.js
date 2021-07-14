import createApp from "./main"

// 服务器端，用于首屏渲染（方法参数为浏览器请求服务时的上下文）
// context 由 render 传入
export default (context) => {
  return new Promise((resolve, reject) => {
    // 获取路由和 APP 实例
    const { app, router } = createApp(context)
    // 获取跳转首屏地址（客户端请求地址）
    router.push(context.url)
    router.onReady(() => {
      resolve(app)
    }, reject)
  })
}

// ？为什么要返回一个 promise
// 上面只是进行了跳转，还可能在获取服务数据的操作，需要异步等待
