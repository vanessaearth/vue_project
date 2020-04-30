
export default {
  validateEmail (rule, value, callback) {
    var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!reg.test(value)) {
      callback(new Error('请输入有效的邮箱'))
    }
    callback()
  },
  // 远程校验名字是否重复
  validateNameDup (rule, value, callback) {
    this.axios.post('/path', {}).then(res => {
      if (res) {
        callback(new Error('名字重复'))
      } else {
        callback()
      }
    })
  },
  phone (rule, value, callback) {
    const reg = /^1[3456789]\d{9}$/
    if (!reg.test(value)) {
      callback(new Error('请输入有效的手机号'))
    } else {
      callback()
    }
  }
}
