const webpack = require('webpack')
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
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
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    // disableHostCheck: true,
    port: 8090,
    proxy: {
      '/api/auth': {
        target: 'XXX',
        changeOrigin: true,
        secure: true
      },
      '/api': {
        target: 'http://localhost:8989',
        changeOrigin: true,
        secure: true
      }
    }
  },
  css: {
    loaderOptions: {
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        additionalData: '@import "~@/assets/scss/_variables.scss";'
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve('src/assets/scss/_variables.scss')]
    }
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

    // 关闭预加载，减少带宽压力
    // https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
    // https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  configureWebpack: {
    name: process.env.NODE_ENV === 'development' ? '测试-欢迎来到我的博客站' : '正式-欢迎来到我的博客站',

    plugins: [
      new NodePolyfillPlugin(),
      new webpack.DefinePlugin({
        'process.env': {

          VUE_ENV: JSON.stringify(process.env.VUE_ENV)
        }
      }),
      new webpack.ProvidePlugin({
        _: 'lodash'
      })
    ]
  }
})
