const fs = require('fs')
const path = require('path')
const app = require('koa-router')()

function resolve (dir) {
  return path.resolve(__dirname, dir)
}
function addMap (router, mapping) {
  for (let key in mapping) {
    if (!key.includes('@')) {
      clog('无效url:', key)
    }
    const keyObj = key.split('@')
    const type = keyObj[0]
    const path = keyObj[1]
    if (type === 'GET') {
      router.get(path, mapping[key])
      clog('get:', path)
    } else if (type === 'POST') {
      router.post(path, mapping[key])
      clog('post:', path)
    }
  }
}
function addControllers (router) {
  let files = fs.readdirSync(resolve('../controllers'))
  var jsFiles = files.filter(f => {
    return f.endsWith('.js')
  })
  for (let f of jsFiles) {
    let mapping = require(resolve('../controllers/' + f))
    addMap(router, mapping)
  }
}

module.exports = function (dir) {
  let controllerDir = dir || 'controllers'
  addControllers(app, controllerDir)
  return app.routes()
}
