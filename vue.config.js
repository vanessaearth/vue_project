
// import bodyParse from 'body-parse'
const port = 9090
const title = '欢迎来到我的博客站'
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  assetsDir: 'static',
  outputDir: process.env.VUE_APP_OUTPUT,
  // publicPath: '/demo',
  // 多入口文件配置
  // pages: {
  //   index: {
  //     entry: 'src/index/main.js',
  //     template: 'public/index.html',
  //     filename: 'index.html',
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   },
  //   second: 'src/second/main.js'
  // },
  devServer: {
    port: port,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://localhost:3000'
        // changeOrigin: true,
        // pathRewrite: {
        //   ['^' + process.env.VUE_APP_BASE_API]: '/mock/5e7d6ad83726895821d1107f/api'
        // }
      }
    }
    // before: app => {
    //   app.use(bodyParse.json())
    //   // url参数
    //   app.use(bodyParse.urlencoded({ extended: true }))
    // }

  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/variables.scss";`
      }
    }
  },
  configureWebpack: {
    name: title
  },
  chainWebpack (config) {
    // 设置svgIcon的loader
    config.module.rule('svg')
      .exclude.add(resolve('src/plugins/icons')).end()
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/plugins/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' }).end()
  }

}
