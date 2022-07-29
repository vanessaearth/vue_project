// 图标的自动加载
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// 获取一个以svg目录目录为上下文的require方法
const req = require.context('./svg', false, /\.svg$/)
// 获取当前目录所有文件名
req.keys().map(req)
Vue.component('SvgIcon', SvgIcon)

// 使用方法
