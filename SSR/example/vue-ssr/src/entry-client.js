import createApp from "./main";

// 客户端激活（服务器中已经完成了所有操作返回一个 app 实例，返回到客户端只需要激活/挂载即可使用）
const { app, router } = createApp()

router.onReady(() => {
  // 挂载激活
  app.$mount('#app')
})
