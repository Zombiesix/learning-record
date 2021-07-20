(async () => {
  const mysql = require('mysql2/promise')
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'zhang79113mysql',
    database: 'user'
  })

  connection.connect(function(err) {
    if (err) {
      console.log('连接失败', err)
    } else {
      console.log('连接成功')
    }
  })

  // connection.end(function(err) {
  //   if (err) return
  //   console.log('连接关闭')
  // })

  // 在 user 数据库中创建按表 demo
  const sql = `CREATE TABLE IF NOT EXISTS demo (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id))`
  let ret = await connection.execute(sql)
  console.log(ret)
})()
