// node 端常用服务器：koa、express、egg.js
const express = require('express')
const app = express()

// 服务器端渲染模块
const { createRenderer } = require('vue-server-renderer')
// 获取渲染器
const renderer = createRenderer()

// 引入 vue
const Vue = require('vue')

// 服务器端路由
app.get('*', async (req, res) => {
  req
  // 创建一个 vue 应用
  const vm = new Vue({
    template: '<div>{{name}}</div>',
    data() {
      return {
        name: 'tony'
      }
    }
  })

  try {
    // 将内容转为字符串形式发送给客户端
    const html = await renderer.renderToString(vm)
    res.send(html)
  } catch(err) {
    res.status(500).send('服务器内部错误')
  }
})

// 监听
app.listen(3000, () => {
  console.log('...服务启动在3000端口')
})
