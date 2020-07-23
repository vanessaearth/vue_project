import Vue from 'vue'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

let config = {
  baseURL: process.env.VUE_APP_BASE_API
  // onUploadProgress: p => { return 100 * (p.loaded / p.total) }
  // headers: {
  //   token: '23'
  // }
}
const _axios = axios.create(config)
// POST传参序列化(添加请求拦截器)
_axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    // 设置令牌请求头
    config.headers['Authorization'] = 'aha ' + token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
_axios.interceptors.response.use((res) => {
  // 判断是否为mock数据;
  let isMock = res.request.match
  let params = {}
  if (res.config.method === 'post') {
    params = typeof (res.config.data) === 'string' ? JSON.parse(res.config.data) : res.config.data
  } else {
    params = res.config.params ? res.config.params : res.config.params
  }
  isMock && window.clog(`%cMock%c ${res.config.url}`,
    'background:#666;color:#fff;padding:3px 5px; border-radius:5px;',
    'color: #09f;', params, res.data)
  // 下载文件时候对响应数据做些事
  if (res.headers['content-type'] === 'application/octet-stream') {
    return res.data
  }
  if (res.data.type === 'video/mp4') {
    return res.data
  }
  // 错误的情况
  if (res.data.header.code !== 0) {
    // 未登录
    if (res.data.header.code === 4040) {
      let url, CAS
      if (window.location.port === '') {
        CAS = process.env.VUE_APP_CAS_PROD
      } else if (window.location.port === '7777' || window.location.port === '8888') {
        CAS = process.env.VUE_APP_CAS_DEV
      } else if (window.location.port === '6666') {
        CAS = process.env.VUE_APP_CAS_TEST
      } else if (window.location.port === '9999') {
        CAS = process.env.VUE_APP_CAS_SHAHE
      }
      url = CAS + '/cas/login?service=' + (window.location.href)
      // utils.analysis(['http.interceptors.4040', 'loginTimeout', `${res.config.url}`])
      MessageBox.alert('页面已失效，请刷新', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.location.href = url
      }).catch(() => {
      })
    } else if (res.data.header.code === 6000) {
      Message({
        type: 'error',
        showClose: true,
        duration: 3000,
        message: '模版不存在'
      })
    } else {
      Message({
        type: 'error',
        showClose: true,
        duration: 3000,
        message: `${res.config.url}, ${res.data.header.code}, ${res.data.header.msg}`
      })
    }
    // 上报错误请求；
    // utils.analysis(['http.interceptors.error', 'code:' + res.data.header.code, res.config.url], 'event')
    return Promise.reject(res)
  }
  return res.data.body
}, (error) => {
  Message({
    type: 'error',
    message: `${error.config.url}, ${error.response.status},`
  })
  return Promise.reject(error)
})
Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}
Vue.use(Plugin)
export default _axios
