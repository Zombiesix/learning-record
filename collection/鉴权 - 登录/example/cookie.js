// 一种机制：
// 当服务返回到客户端时设置了 cookie 值时，后面客户端调服务时，会把之前的 cookie 值带回来；
// 也就是响应式设置的 cookie，请求时自动会将 cookie 加到 header 中
// eg:  cookie undefined
//      cookie abc=123

// 不足：
// 明文、大小有限、无法存对象实例

const http = require('http')

const session = {}
http.createServer((req, res) => {
  console.log('cookie', req.headers.cookie);

  // res.setHeader('Set-Cookie', 'abc=123;')
  // res.end('hello cookie')
  
  // 实例：
  // 存编号 id
  const sessionKey = 'sid'
  const cookie = req.headers.cookie
  // 判断 id 是否存在
  if (cookie && cookie.indexOf(sessionKey) > -1) {
    // 存在 旧用户
    res.end('comeback')
    // 取编号
    const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
    const sid = pattern.exec(cookie)[1]
    console.log('user session', session[sid]);
  } else {
    const sid = (Math.random() * 999999).toFixed()
    res.setHeader('Set-Cookie', `${sessionKey}=${sid};`)
    session[sid] = {name: 'tony'}
    res.end('welcome')
  }
  
}).listen(3000, () => {
  console.log('server at 3000...')
})
