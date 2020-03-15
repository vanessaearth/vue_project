
import bodyParse from 'body-parse'
const port = 7070
const title = 'vue项目实战'
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/best-practice',
  devServer: {
    port: port,
    before: app => {
      app.use(bodyParse.json())
      // url参数
      app.use(
        bodyParse.urlencoded({
          extended: true
        })
      )
    }

  },
  configureWebpack: {
    name: title
  },
  chainWebpack (config) {
    config.module.rule('svg')
      .exclude.add(resolve('src/icons')).end()
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' }).end()
  }

}
