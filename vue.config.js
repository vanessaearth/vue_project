
// import bodyParse from 'body-parse'
const port = 9090
const path = require('path')
module.exports = {
  // publicPath: '/start',
  // assetsDir: 'static', //设置css,js,img等在static文件中
  // outputDir: process.env.VUE_APP_OUTPUT,
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
  // 配置webpack
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    name: process.env.NODE_ENV === 'development' ? '测试-欢迎来到我的博客站' : '正式-欢迎来到我的博客站'
  },
  chainWebpack (config) {
    // 设置svgIcon的loader
    // 1.默认的svg规则排除自定义的svg目录
    config.module.rule('svg')
      .exclude.add(path.resolve(__dirname, 'src/icons')).end()
    // 2.新增icon规则只包含icon目录
    config.module.rule('icons')
      .test(/\.svg$/)// 规则
      .include.add(path.resolve(__dirname, 'src/icons')).end()
      .use('svg-sprite-loader')// 指定loader
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' }).end()
  }

}
