/**
 * 设置cookie
 * @param {String} name cookie名
 * @param {any} value cookie值
 * @param {Object | Number} options 附加参数 | 过期时间（以天为单位）
 * options.path {optional} 路径
 * options.expires {optional} 毫秒数
 * }
 */
export default (name, value, options = {}) => {
  let domain
  let domainParts
  let expires
  let host = location.hostname
  // expires
  if (typeof options === 'number') {
    let days = options
    expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toGMTString()
    options = {}
  } else if (options.expires) {
    let ms = new Date().getTime() + options.expires
    expires = new Date(ms).toGMTString()
  } else {
    expires = ''
  }
  name = encodeURIComponent(name)
  value = encodeURIComponent(value)
  // domain
  domainParts = host.split('.')
  if (domainParts.length === 1) {
    domain = host
  } else if (
    domainParts.length > 2 &&
    /^[a-z]+$/i.test(domainParts[domainParts.length - 1])
  ) {
    domainParts = domainParts.slice(-2)
    domain = '.' + domainParts.join('.')
  } else {
    domain = domainParts.join('.')
  }
  // path
  let path = options.path || ''
  document.cookie = `${name}=${value}; expires=${expires}; path=${path}; domain=${domain}`
  // document.cookie =
  //   name +
  //   '=' +
  //   value +
  //   '; expires=' +
  //   expires +
  //   '; path=' +
  //   path +
  //   '; domain=' +
  //   domain
}
