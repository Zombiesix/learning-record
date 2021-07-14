import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'

Vue.config.productionTip = false

// 需要返回一个应用程序工厂: 返回 Vue 实例和 Router 实例、Store 实例
export default function createApp(context) {
  // 处理首屏，处理路由跳转（得到一个 Router 实例）
  const router = createRouter()
  const app = new Vue({ // 得到一个 Vue 实例
    router,
    context,
    render: (h) => h(App)
  })
  return {
    app, router
  }
}
