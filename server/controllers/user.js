const User = require('../models/user.js')
const fs = require('fs')
const path = require('path')
let userList = async (ctx, next) => {
  const user = await User.findAll()
  console.log('user:', user)
  ctx.response.body = user
}

let login = async (ctx, next) => {
  ctx.response.body = `
  <form action="/login" method="post">
  <input name="name" value="tom">
  <input type="submit" value="submit">
  </form>
  `
}
let index = async (ctx, next) => {
  const index = await fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8', (err, data) => {
    console.log('err:', err)
  })
  // console.log('file:', index)
  ctx.response.body = index
}
let signIn = async (ctx, next) => {
  var name = ctx.request.body.name || ''
  console.log('name:', ctx.request.body)
  if (name === 'tom') {
    ctx.response.body = 'welcome,' + name
  } else {
    ctx.response.body = 'err'
  }
}
module.exports = {
  'GET@/': index,
  'GET@/login': login,
  'GET@/userList': userList,
  'POST@/login': signIn
}
// module.exports = {
//   'GET /': index,
//   'GET /userList': userList,
//   'POST /login': signIn
// }
