const webpack = require('webpack')
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
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
        target: 'XXX',
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
    // 关闭预加载，减少带宽压力
    // https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
    // https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  configureWebpack: {
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
