function getQueryString (paramName) {
  var queryStr = location.search.slice(1)
  var queryArr = queryStr.split('&')
  // 参数对象，存放所有参数及参数值
  var queryObj = {}
  queryArr.forEach(function (v) {
    var key = v.split('=')[0]
    var value = decodeURIComponent(v.split('=')[1])
    queryObj[key] = value
  })
  // 如果输入有参数则return 参数值
  if (paramName !== undefined) {
    // 参数对象里包含该参数则返回参数值
    if (paramName in queryObj) {
      return queryObj[paramName]
    } else {
      // 否则返回空
      return ''
    }
  }
  // 若用户没有输入参数则返回整个参数对象
  return queryObj
}
export default getQueryString
