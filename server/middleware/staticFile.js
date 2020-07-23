const path = require('path')
const mime = require('mime')
const fs = require('mz/fs')
/**
 *
 * @param {*} url /static/,读取这个目录的文件
 * @param {*} dir __dirname+'/static ,在这个目录中查找
 */
function staticFile (url, dir) {
  return async (ctx, next) => {
    let requestPath = ctx.request.path
    if (requestPath.startsWith(url)) {
      // let filePath = path.join(dir, requestPath.substring(url.length))
      let filePath = path.join(dir, requestPath.substring(url.length))

      if (await fs.exists(filePath)) {
        // clog('有这个文件')
        ctx.response.type = mime.getType(requestPath)
        ctx.response.body = await fs.readFile(filePath)
      } else {
        clog('没有这个文件')
      }
    } else {
      await next()
    }
  }
}
module.exports = staticFile
