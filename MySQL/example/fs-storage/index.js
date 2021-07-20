// 注意：以 JSON 的格式存入
// 适用：几十万以下数据可以使用
const fs = require('fs')

// 数据写入
function set(key, val) {
  fs.readFile('./db.json', (err, data) => {
    const json = data ? JSON.parse(data) : {}
    json[key] = val
    fs.writeFile('./db.json', JSON.stringify(json), err => {
      if (err) console.log(err)
    })
  })
}

// 数据读取
function get(key) {
  fs.readFile('./db.json', (err, data) => {
    const json = JSON.parse(data)
    console.log(json[key])
  })
}

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('line', input => {
  const [op, key, val] = input.split(' ') // 确定输入格式
  switch (op) {
    case 'get': // get name
      get(key)
      break;
    case 'set': // set name tony
      set(key, val)
      break;
    case 'quit':  // quit
      rl.close()
      break;
    default:
      console.log('没有操作')
  }
})
rl.on('close', () => {
  console.log('程序结束')
  process.exit(0)
})
