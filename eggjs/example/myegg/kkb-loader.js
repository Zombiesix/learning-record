const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

function load(dir, cb) {
  const url = path.resolve(__dirname, dir)
  const files = fs.readdirSync(url)
  files.forEach(filename => {
    filename = filename.replace('.js', '')
    const file = require(url + '/' + filename) // .../routes/user 文件中的导出对象
    cb(filename, file)
  })
}

function initRouter(app) {
  const router = new Router()
  load('routes', (filename, routes) => {
    // /user/
    const prefix = filename === 'index' ? '' : `/${filename}`

    // json 工厂  或是 json
    routes = typeof routes === 'function' ? routes(app) : routes

    Object.keys(routes).forEach(key => {
      const [method, path] = key.split(' ')

      console.log(`正在映射 ${method.toUpperCase()} ${prefix + path}`);
      // 中间件 =》 业务方法 app  重新构造中间件（原本的 ctx 变为了 app） 然后 执行方法

      // router[method](prefix + path, routes[key])
      // routes[key] 是 routes 中的对象值，原本传入的是 ctx，现在不是所以不能直接使用，需要修改
      router[method](prefix + path, async ctx => {
        app.ctx = ctx
        await routes[key](app)
      })
    })
  })
  return router
}

function initController(app) {
  const controllers = {}
  load('controller', (filename, controller) => {
    controllers[filename] = controller(app)
  })
  return controllers
}

function initService(app) {
  const services = {}
  load('service', (filename, service) => {
    services[filename] = service(app)
  })
  return services
}

const Sequelize = require('sequelize')
function loadConfig(app) {
  load('config', (filename, conf) => { // conf 为配置文件中导出的对象
    if (conf.db) {
      app.$db = new Sequelize(conf.db)

      // 自动加载模型
      app.$model = {}
      load('model', (filename, {schema, options}) => {
        app.$model[filename] = app.$db.define(filename, schema, options)
      })
      // 数据库同步
      app.$db.sync()
    }

    if (conf.middleware) {
      conf.middleware.forEach(mid => {
        const midPath = path.resolve(__dirname, 'middleware', mid)
        app.$app.use(require(midPath)) // koa 框架中自带的 use 方法用于加载中间件
      })
    }
  })
}

const schedule = require('node-schedule')
function initSchedule() {
  // 读取控制器
  load('schedule', (filename, config) => {
    schedule.scheduleJob(config.interval, config.handler)
  })
}

module.exports = { initRouter, initController, initService, loadConfig, initSchedule }
