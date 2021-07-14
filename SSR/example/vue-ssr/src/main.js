import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'

Vue.config.productionTip = false

/**
 * 问题：比如 Home 组件的渲染需要发送服务调用数据，首屏为 Home 页面时会调用其中的 asyncData 方法获取到数据
 *  但当首屏不是 Home 组件时，asyncData 方法不会调用，会导致进入这个页面无法获取到数据；当然可以在 created 方法中调用
 * 解决：加上一个全局混入，处理客户端调用 asyncData 方法
 *  */
Vue.mixin({
  beforeMount() { // 挂载前钩子只会在客户端调用
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
})

// 需要返回一个应用程序工厂: 返回 Vue 实例和 Router 实例、Store 实例
export default function createApp(context) {
  // 处理首屏，处理路由跳转（得到一个 Router 实例）
  const router = createRouter()
  // 创建 store 实例
  const store = createStore()
  const app = new Vue({ // 得到一个 Vue 实例
    router,
    store,
    context,
    render: (h) => h(App)
  })
  return {
    app, router, store
  }
}
