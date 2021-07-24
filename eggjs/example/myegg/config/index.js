module.exports = {
  db: {
    dialect:'mysql',
    host:'localhost',
    database:'demo',
    username:'root',
    password:'zhang79113mysql'
  },

  // 中间件的配置
  middleware: ['logger']
}
