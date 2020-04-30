const fs = require('fs')
function get (key) {
  fs.readFile('./db.json', (err, data) => {
    const json = JSON.parse(data)
    console.log(json[key], 'get-err', err)
  })
}
function set (key, value) {
  fs.readFile('./db.json', (err, data) => {
    console.log('set-err:', err)
    // 空文件
    const json = data ? JSON.parse(data) : {}
    json[key] = value
    fs.writeFile('./db.json', JSON.stringify(json), err => {
      if (err) {
        console.log(err)
      } else {
        console.log('写入成功')
      }
    })
  })
}
// 命令行接口
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('line', function (input) {
  const [op, key, value] = input.split(' ')
  if (op === 'get') {
    get(key)
  } else if (op === 'set') {
    set(key, value)
  } else if (op === 'quit') {
    rl.close()
  } else {
    console.log('没有操作')
  }
})
rl.on('close', function () {
  console.log('程序接受')
  process.exit()
})
// set user { name: 'jerry' }
